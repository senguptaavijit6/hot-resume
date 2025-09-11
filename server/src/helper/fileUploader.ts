import fs from 'node:fs'



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
        supportedFileTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/ico", "image/webp"],
        maxFileSize = 1024 * 1024 * 5
    }: FileUploaderOptions = {}) {
        this.destination = destination;
        this.supportedFileTypes = supportedFileTypes;
        this.maxFileSize = maxFileSize;

        if (!fs.existsSync(this.destination)) {
            fs.mkdirSync(this.destination, { recursive: true })
        }
    }

    
}