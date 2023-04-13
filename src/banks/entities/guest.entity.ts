import { BaseEntity } from "src/utils/BaseEntity"
import { Entity,  Column } from "typeorm"

@Entity()
export class Guest extends BaseEntity {
    
    @Column(
        {
            default: 0
        }
    )
    balance:number

    @Column(
        {
            unique:true
        }
    )
    name:string

}