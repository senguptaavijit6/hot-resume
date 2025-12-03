import fs from 'node:fs';
import multer, { StorageEngine } from 'multer';
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

    storage: StorageEngine;
    fileFilter: multer.Options['fileFilter'];
    upload: multer.Multer;

    constructor({
        destination = "public/uploads/",
        supportedFileTypes = ["jpeg", "jpg", "png", "gif", "ico", "webp"],
        maxFileSize = 1024 * 1024 * 5, // 5 MB
    }: FileUploaderOptions = {}) {
        this.destination = destination;
        this.supportedFileTypes = supportedFileTypes;
        this.maxFileSize = maxFileSize;

        // Ensure upload directory exists
        if (!fs.existsSync(this.destination)) {
            fs.mkdirSync(this.destination, { recursive: true });
        }

        // Configure storage
        this.storage = multer.diskStorage({
            destination: (req: Request, file, cb) => {
                cb(null, this.destination);
            },
            filename: (req: Request, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = this.getFileExtension(file.originalname);
                cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
            },
        });

        // Configure file filter
        this.fileFilter = (req, file, cb) => {
            const ext = this.getFileExtension(file.originalname);
            if (this.supportedFileTypes.includes(ext)) {
                cb(null, true);
            } else {
                cb(new Error("Unsupported file type"));
            }
        };

        // Configure multer instance
        this.upload = multer({
            storage: this.storage,
            fileFilter: this.fileFilter,
            limits: { fileSize: this.maxFileSize },
        });
    }

    private getFileExtension(filename: string): string {
        const index = filename.lastIndexOf(".");
        return index !== -1 ? filename.slice(index + 1).toLowerCase() : "";
    }
}

export default FileUploader;