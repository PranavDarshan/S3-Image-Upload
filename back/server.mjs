//imports
import  {S3Client, GetObjectCommand, PutObjectCommand} from "@aws-sdk/client-s3"
import {getSignedUrl} from "@aws-sdk/s3-request-presigner"
import express from 'express'



const app = express()

app.use(express.static('front'))

//upload upto 8 images in a single directory with the format dir-timestamp
const uploadContentType = "multipart/form-data"
async function createDirPath(){
    return "dir-"+ Date.now()+"/"
}


const dirPath = await createDirPath();

//create new S3 client with your credentials
//replace them with your credentials
const s3Client = new S3Client({
    region : "region",
    credentials :{
        accessKeyId : "accessKeyId",
        secretAccessKey : "secretAccessKey",
    },
});

//create a function to get the object from the required s3 bucket
//replace bucket name with your bucket
async function getObjectURL(key){
    const command = new GetObjectCommand({
        Bucket : "bucket-name",
        Key : key,
    });
    const url = await getSignedUrl(s3Client, command, {expiresIn : 60*3});
    return url;  
}


//create a function to put the object to the required s3 bucket
//replace bucket name with your bucket
export async function putObject(filename, contentType){
    const command = new PutObjectCommand({
        Bucket: 'bucket-name',
        Key : filename ,
        contentType : contentType,
    });
    
    const url = await getSignedUrl(s3Client, command);
    return url;
}

//download link is present on this path
app.get('/output/:imagePath', async (req, res)=>{
    const imagePath = req.params.imagePath;
    const downloadURL = await getObjectURL(imagePath);
    res.send({downloadURL});
});

//upload link is present on this path
app.get('/upload/:dirPath/:imagePath', async (req, res)=>{
    const imagePath = req.params.imagePath;
    const dirPath= req.params.dirPath;
    const uploadURL = await putObject(dirPath+"/"+imagePath);
    res.send({uploadURL});
});
  
//running the server on port 8080
  app.listen(8080, () => console.log("listening on port 8080"))
