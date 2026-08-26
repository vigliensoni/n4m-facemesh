// Loads a tfjs graph model straight off disk via fs, bypassing HTTP entirely.
// tfhub.dev/Kaggle-hosted model downloads were unreliable from inside the
// Electron renderer's Node-side fetch, so blazeface/facemesh model files are
// vendored locally under ./models and loaded through this IOHandler instead.
const fs = require("fs");
const path = require("path");

function loadLocalGraphModel(modelDir) {
  return {
    load: async () => {
      const modelJsonPath = path.join(modelDir, "model.json");
      const modelJson = JSON.parse(fs.readFileSync(modelJsonPath, "utf8"));

      const weightSpecs = [];
      const buffers = [];
      for (const group of modelJson.weightsManifest) {
        weightSpecs.push(...group.weights);
        for (const p of group.paths) {
          buffers.push(fs.readFileSync(path.join(modelDir, p)));
        }
      }
      const weightData = Buffer.concat(buffers);

      return {
        modelTopology: modelJson.modelTopology,
        format: modelJson.format,
        generatedBy: modelJson.generatedBy,
        convertedBy: modelJson.convertedBy,
        // Without this, GraphExecutor has no named output signature and
        // falls back to picking output tensors in the wrong order (e.g.
        // facemesh's mesh-coords tensor ends up swapped with an unrelated
        // 266-element tensor, breaking the `reshape(coords, [-1, 3])` call
        // in pipeline.js).
        userDefinedMetadata: modelJson.userDefinedMetadata,
        weightSpecs,
        weightData: weightData.buffer.slice(
          weightData.byteOffset,
          weightData.byteOffset + weightData.byteLength
        ),
      };
    },
  };
}

module.exports = { loadLocalGraphModel };
