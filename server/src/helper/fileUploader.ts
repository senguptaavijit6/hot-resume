import fs from 'node:fs'
import multer from 'multer';
import { Request } from 'express';



interface FileUploaderOptions {
    destination?: string;
    supportedFileTypes?: string[];
    maxFileSize?: number;
}

class FileUploader {
    destination: string;
    supportedFileTypes: string[];
    maxFileSize: number;

    constructor({
        destination = "public/uploads/",
        supportedFileTypes = ["jpeg", "jpg", "png", "gif", "ico", "webp"],
        maxFileSize = 1024 * 1024 * 5
    }: FileUploaderOptions = {}) {
        this.destination = destination;
        this.supportedFileTypes = supportedFileTypes;
        this.maxFileSize = maxFileSize;

        if (!fs.existsSync(this.destination)) {
            fs.mkdirSync(this.destination, { recursive: true })
        }
    }

    checkFileType = (file_name: string):string => {
        const file_name_arr:string[] = Array.from(file_name)
        const indexOf:number = file_name_arr.lastIndexOf(".")
        const ext:string = file_name_arr.slice(indexOf)[1]
        return ext
    }

    storage = multer.diskStorage({
        destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
            cb(null, this.destination);
        },
        filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            const ext = this.checkFileType(file.originalname)
            cb(null, file.fieldname + '-' + uniqueSuffix + "." + ext)
        }
    })

    fileFilter: multer.Options['fileFilter'] = (req, file, cb) => {
        if (this.supportedFileTypes.includes(this.checkFileType(file.originalname))) {
            cb(null, true);
        } else {
            cb(new Error("Unsupported file type"));
        }
    }

    upload() {
        return multer({
            storage: this.storage,
            fileFilter: this.fileFilter,
            limits: { fileSize: this.maxFileSize }
        });
    }
}

export default FileUploader