import supertest from "supertest";
import app from "../index";
import { Users, UserRoles } from "../models";


describe("Probando el registro de usuarios", ( ) => {

    afterAll(async (done) => {
        await Users.destroy( {where: { email: "rzarate@gmail.com"} });
        await UserRoles.destroy({ where: { userId: 5 } });
        done()
    });
    
    //*=====================Test create New Users
    it("Agregando un nuevo usuario", async ( done ) => {
      //arrange
      let userObj = {
         "firstName": "Rómulo",
         "lastName": "Zárate",
         "email": "rzarate@gmail.com",
         "password": "roza1234"
      };

      //assert
      const response = await supertest(app).post("/api/v1/users/2").send(userObj);

      //act
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("message", "Registro exitoso!");

      done();
  });

  //*=====================Test getting Users
   it("Obteniendo todos los usuarios", async ( done ) => {
      //arrange

      //assert
      const response = await supertest(app).get("/api/v1/users/3");

      //act
      expect(response.status).toBe(200);

      done();
   });

  //*=====================Test edit Users
   it("Modificando un usuario", async ( done ) => {
      //arrange
      const id = 5;
      let userObj = {
         "firstName": "Pánfilo",
         "lastName": "López",
         "email": "palo1234@gmail.com"
      };

      //assert
      const response = await supertest(app).put(`/api/v1/users/${id}/2`).send(userObj);

      //act
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("message", "Se han hecho las modificaciones solicitadas");

      done();
   });

   //*=====================Test adding a Role to a Users
   it("Agregando un rol a un usuario", async ( done ) => {
      //arrange
      const id = 5;
      const role = 2;

      //assert
      const response = await supertest(app).post(`/api/v1/users/${id}/roles/${role}`);

      //act
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("message", "El recurso se ha agregado satisfactoriamente");

      done();
   });

   //*=====================Test editing a Role to a Users
   it("Modificando un rol a un usuario", async ( done ) => {
      //arrange
      const id = 5;
      const role = 2;
      const roleObj = {
         roleId: 3
      };

      //assert
      const response = await supertest(app).put(`/api/v1/users/${id}/roles/${role}`).send(roleObj);

      //act
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("message", "Se ha hecho la modificación solicitada");

      done();
   });

   //*=====================Test get all Users' roles
   it("Obteniendo los roles de todos los usuarios", async ( done ) => {
      //arrange
      //assert
      const response = await supertest(app).get(`/api/v1/users/roles`);

      //act
      expect(response.status).toBe(200);

      done();
   });

});