import {IData, Query} from "../models/data.model"
import dataSchema from "../schemas/data.schema"

class DataService {
    public async createPost(postParams: IData) {
        try {
            const dataModel = new dataSchema(postParams);
            await dataModel.save();
        } catch (error) {
            console.error('Wystąpił błąd podczas tworzenia danych:', error);
            throw new Error('Wystąpił błąd podczas tworzenia danych');
        }
    }
 
    public async query(query: Query<number | string | boolean>) {
        try {
            const result = await dataSchema.find(query, { __v: 0});
            return result;
       } catch (error) {
           throw new Error(`Query failed: ${error}`);
       }
   }

   public async getSomeData(num: number) {
    try {
        const result = await dataSchema.find({}, { __v: 0}, {limit: num});
        return result;
   } catch (error) {
       throw new Error(`Query failed: ${error}`);
   }
   }

   public async deleteData(query: Query<number | string | boolean>) {
       try {
           await dataSchema.deleteMany(query);
       } catch (error) {
           console.error('Wystąpił błąd podczas usuwania danych:', error);
           throw new Error('Wystąpił błąd podczas usuwania danych');
       }
   }

}

export default DataService;
