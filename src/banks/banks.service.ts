import { HttpException, HttpStatus, Injectable, Logger, UploadedFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';
import { Bank } from './entities/bank.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Storage } from '@google-cloud/storage';

@Injectable()
export class BanksService {

  constructor(
    // private readonly logger = new Logger(BanksService.name),
    @InjectRepository(Bank) private readonly bankRepository:Repository<Bank>
  ){}
  //Useful methods
  async findBankByName(name:string):Promise<Bank>{
    return await this.bankRepository.findOne({where:{name}})
  }
  async changeBalanceOfBank(bankName:string,newBalance:number):Promise<Bank>{
    const bank = await this.findBankByName(bankName)
    bank.balance=newBalance
    return await this.bankRepository.save(bank)
  }
  
  //API methods  
  async addBank(data:CreateBankDto):Promise<Bank>{
    const candidate= await this.findBankByName(data.name)
    if(candidate){
      throw new HttpException("This bank is already exist",HttpStatus.CONFLICT)
    }
    const bank = this.bankRepository.create(data)
    return await this.bankRepository.save(bank)
  }
  async getAllBanks():Promise<Bank[]>{
    return await this.bankRepository.find()
  }
  async findBankById(id:number):Promise<Bank>{
    return await this.bankRepository.findOne({where:{id}})
  }
  async updateBankById(id:number,data:UpdateBankDto):Promise<Bank>{
    const bank = await this.bankRepository.findOne({where:{id}})
    if(!bank){
      throw new HttpException("Bank is not found",HttpStatus.NOT_FOUND)
    }
    await this.bankRepository.update(id,data)
    return await this.bankRepository.findOne({where:{id}})
  }
  async deleteBankById(id:number):Promise<Bank>{
    const bank = await this.bankRepository.findOne({where:{id},relations:["transactions"]})
    if(!bank){
      throw new HttpException("Bank is not found",HttpStatus.NOT_FOUND)
    }
    if(bank.transactions.length){
      throw new HttpException("Bank has transactions, delete them firstly",HttpStatus.CONFLICT)
    }
    await this.bankRepository.delete(id)
    return bank
  }

  async uploadFile(@UploadedFile() file: Express.Multer.File){ 
    const gc = new Storage({
      keyFilename: "./src/testproject-383216-0e11a80b9e43.json",
      projectId: 'testproject-383216'
    })
    const bucket = gc.bucket('file_examples1')
    const {originalname} = file;
    const fileUpload = bucket.file(originalname)

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });
    stream.on('error', (err) => {
      console.error(err)
      gc.getBuckets().then(x => console.log(x));
    })

    stream.on('finish', () => {
      console.log('File uploaded succesfully');
    });
    stream.end(file.buffer);
  }

  async getListFiles(){
    const gc = new Storage({
      keyFilename: "./src/testproject-383216-0e11a80b9e43.json",
      projectId: 'testproject-383216'
    })
    const bucket = gc.bucket('file_examples1');

    const [files] = await bucket.getFiles();

    console.log("Files:");
    files.forEach((file)=> {
      console.log(file.name)
    })

    return files;
  }
}
