const ImageKit = require("imagekit");

const imageKit = new ImageKit({
    publicKey: "public_ZIT4a/18Y7+Xwf1JtS4mCVHzHyY=",
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: "https://ik.imagekit.io/bdm8ti24j"
});

async function uploadFile(buffer) {
    try {
        const result = await imageKit.upload({
            file: buffer,
            fileName: "image.jpg"
        });

        return result;
    } catch (error) {
        console.log("Upload Error:", error.message);
    }
}

module.exports = uploadFile;