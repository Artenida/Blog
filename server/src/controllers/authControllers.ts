import { Request, Response, query } from 'express';
import { db } from '../config';

export const register = async (req: Request, res: Response) => {
   //CHECK USER IF EXISTS

   //Kontroll nese fiels jane bosh pere arsye sigurie

    const query = "SELECT * FROM users WHERE username= ?"

    db.query(query, [req.body.username], (err, data) => {
      if(err) return res.status(500).json(err);
      if(data.length) return res.status(409).json("User already exists");
    })
   //CREATE A NEW USER
     //Hash password
    //  const salt = bycript.genSaltSync(10);
    //  const hashedPassword = bycript.hashSync(req.body.password, salt);

     const query1 = "INSERT INTO users (`username`, `email`, `password`) VALUE (?)"
     const values = [req.body.username, req.body.email, req.body.password]
     db.query(query1, [values], (err, data) => {
      if(err) return res.status(500).json(err);
      return res.status(200).json("User has been created");
     })

}

export const login = (req: Request, res: Response): void => {
  // Your code for login endpoint
   const query = "SELECT * FROM users WHERE username = ?"
   
   db.query(query, [req.body.username], (err, data) => {
    if(err) return res.status(500).json(err);
    if(data.length === 0 ) return res.status(404).json("User not found");

    // const checkPassword = bcrypt.compareSync(req.body.password, data[0].password)

    if(!req.body.password) return res.status(400).json("Wrong password or username!")
   })
}

export const logout = (req: Request, res: Response): void => {
  // Your code for logout endpoint
}
