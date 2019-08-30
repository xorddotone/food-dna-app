import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace com.food.dna{
   export class Product extends Asset {
      referenceNumber: string;
      type: string;
      quantity: number;
      productionDate: number;
      expirationDate: number;
      foodDna: number;
      owner: Business;
   }
   export abstract class Business extends Participant {
      email: string;
      name: string;
      address: string;
      city: string;
      postalCode: number;
      country: string;
      referencePerson: Business;
   }
   export class Grower extends Business {
   }
   export class Shipper extends Business {
   }
   export class Importer extends Business {
   }
   export class transferProduct extends Transaction {
      product: Product;
      newOwner: Business;
   }
   export class SetupDemo extends Transaction {
   }
// }
