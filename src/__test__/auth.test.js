import supertest from "supertest";
import app from "../app";
import {Users} from "../models/";


describe("Probando el registro de usuarios", () => {

    beforeAll(async () => {
        await Users.destroy({where: { email: "kadoshrr2019@gmail.com"}})
    });
    //=====================Test singup New Users
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
        expect(response.body).toHaveProperty("firstName", "Roger");
        expect(response.body).toHaveProperty("lastName", "Reyes");
        
    });

    //=========================Test Create Token
    it("Creando un token de autorizacion", () => {
        //arrange
        let payload = {
            id: 7,
            firstName: "Roger",
            lastName: "Reyes",
            email: "kadoshrr2019@gmail.com",
        };
        //assert
        let token = sign(payload);

        //act
        expect(token).toBeDefined();
    });

    //Test Login
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
        expect(response.body).toHaveProperty("token");
        expect(response.body).toHaveProperty("message", "Has iniciado sesión correctamente");
        
    });



});

