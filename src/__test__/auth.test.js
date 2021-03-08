import supertest from "supertest";
import app from "../index";
import { Users } from "../models/";
// import { sign } from '../middlewares/jwt';
import { generateJWT } from "../middlewares/jwt";


describe("Probando el registro de usuarios", ( ) => {

    afterAll(async (done) => {
        await Users.destroy({where: { email: "kadoshrr2019@gmail.com"}});
        done()
    });
    
    //*=====================Test singup New Users
    it("Agregando un nuevo usuario", async ( done ) => {
        //arrange
        let userObj = {
            firstName: "Roger",
            lastName: "Reyes",
            email: "kadoshrr2019@gmail.com",
            password: "roger12345"
        };

        //assert
        const response = await supertest(app).post("/api/v1/signup").send(userObj);

        //act
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("newUser");
        expect(response.body).toHaveProperty("message", "Registro exitoso!");

        done();
    });
    
    //*=====================Test singup Existing Users
    it("Agregando un usuario ya existente", async ( done ) => {
        //arrange
        let userObj = {
            firstName: "Roger",
            lastName: "Reyes",
            email: "kadoshrr2019@gmail.com",
            password: "roger12345"
        };

        //assert
        const response = await supertest(app).post("/api/v1/signup").send(userObj);

        //act
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "Hubo un error al tratar de registrar el usuario en el sistema");

        done();
    });

    //*=========================Test Create Token
    it("Creando un token de autorizacion", () => {
        //arrange
        let payload = {
            id: 7,
            firstName: "Roger",
            lastName: "Reyes",
            email: "kadoshrr2019@gmail.com",
        };
        //assert
        const token = generateJWT(payload);

        //act
        expect(token).toBeDefined();
    });

    //*=========================Test Login
    it("Iniciando sesión", async ( done ) => {
        //arrange
        let userObj = {
            email: "kadoshrr2019@gmail.com",
            password: "roger12345"
        };

        //assert
        const response = await supertest(app).post("/api/v1/login").send(userObj);

        //act
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("user");
        expect(response.body).toHaveProperty("token");
        expect(response.body).toHaveProperty("message", "Inicio de sesión exitoso!");

        done();
    });

    //*=========================Reset Password
    // La tabla RestTokens genera un registro con el id del User creado por lo que no se puede borrar el registro del User al final de las prubas, Por este motivo comentamos esta prueba.
    // it("Token para reestablecer contraseña", async ( done ) => {
    //     //arrange
    //     let userObj = {
    //         email: "kadoshrr2019@gmail.com",
    //         password: "roger12345"
    //     };

    //     //assert
    //     const response = await supertest(app).post("/api/v1/reset-password").send(userObj);

    //     //act
    //     expect(response.status).toBe(202);
    //     expect(response.body).toHaveProperty("message", "Petición aceptada, se ha enviado un correo electrónico a su buzón de entrada");

    //     done();
    // });
});
