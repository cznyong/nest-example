import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true , length: 50 })
  email: string;

  @Column({ type: "varchar", length: 50 } )
  name: string;

  @Column()
  password: string;

}

export default User;