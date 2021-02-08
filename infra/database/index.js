import mongoose from "mongoose";

class ManageDB{

    constructor({config,logger}) {
        this.config = config;
        this.logger = logger;
    }

    async connect(){
        let credentials = '';
        if(this.config.url){
            credentials = this.config.url
        }
    }

}
