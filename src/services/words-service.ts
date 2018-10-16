import {FeathersApi} from './feathers-api';
import { autoinject } from 'aurelia-framework';

@autoinject()
export class WordsService {
    service:any;
    constructor(feathers:FeathersApi){
        this.service = feathers.client.service('words')
    }

    find(criteria:any):Promise<any>{
        return this.service.find(criteria);
    }

    save(word:any):Promise<any>{
        return this.service.create(word);
    }

    update(word:any):Promise<any>{
        return this.service.update(word._id,word);
    }

    onCreated(callback:Function){
        this.service.on('created',message=>{
            callback(message);
        });
    }

    delete(id:any):Promise<any>{
        return this.service.remove(id);
    }
}