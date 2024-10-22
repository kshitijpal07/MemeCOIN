import axios from 'axios';

const PINATA_API_KEY = "6454976fd445e2ddc00e";
const PINATA_SECRET_KEY = "242b448b62eaf641a5871cfc7767f67f0230581f854014eb2588ab32e44031ad";

export const uploadImageToPinata = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const metadata = JSON.stringify({
        name: 'NFT Image'
    });
    formData.append('pinataMetadata', metadata);

    try {
        const res = await axios.post(
            "https://api.pinata.cloud/pinning/pinFileToIPFS",
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    pinata_api_key: PINATA_API_KEY,
                    pinata_secret_api_key: PINATA_SECRET_KEY
                }
            }
        );
        return `ipfs://${res.data.IpfsHash}`;
    } catch (error) {
        throw new Error(`Failed to upload image: ${error.message}`);
    }
};

export const uploadMetadataToPinata = async (imageUrl, name, description) => {
    const metadata = {
        name,
        description,
        image: imageUrl,
        attributes: []
    };

    try {
        const res = await axios.post(
            "https://api.pinata.cloud/pinning/pinJSONToIPFS",
            metadata,
            {
                headers: {
                    'Content-Type': 'application/json',
                    pinata_api_key: PINATA_API_KEY,
                    pinata_secret_api_key: PINATA_SECRET_KEY
                }
            }
        );
        return `ipfs://${res.data.IpfsHash}`;
    } catch (error) {
        throw new Error(`Failed to upload metadata: ${error.message}`);
    }
};