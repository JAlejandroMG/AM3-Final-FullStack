import supertest from "supertest";
import app from "../index";
import { Actors } from "../models";


describe("Probando peticiones de Actores", ( ) => {

   afterAll(async (done) => {
      await Actors.destroy({where: { name: "Roger Reyes"}});
      done()
   });
   
   //*=====================Test singup New Actors
   it("Agregando un nuevo actor", async ( done ) => {
      //arrange
      let actorObj = {
         name: "Roger Reyes"
      };

      //assert
      const response = await supertest(app).post("/api/v1/actors/2").send(actorObj);

      //act
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("message", "Registro exitoso");

      done();
   });
   
   //*=====================Test getting Actors
   it("Obteniendo todos los actores", async ( done ) => {
      //arrange

      //assert
      const response = await supertest(app).get("/api/v1/actors/3");

      //act
      expect(response.status).toBe(200);

      done();
   });
   
   //*=====================Test getting Actor by ID
   it("Obteniendo un actor por su id", async ( done ) => {
      //arrange
      const id = 1;

      //assert
      const response = await supertest(app).get(`/api/v1/actors/${id}/1`);

      //act
      expect(response.status).toBe(200);

      done();
   });
   
   //*=====================Test editing Actor by ID
   it("Modificar un actor por su id", async ( done ) => {
      //arrange
      const actorObj = {
         name: "Mario Reyna"
      };

      //assert
      const response = await supertest(app).put(`/api/v1/actors/6007/2`).send(actorObj);

      //act
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", "El registro del actor ha sido modificado");

      done();
   });
   
   //*=====================Test deleting Actor by ID
   it("Eliminar un actor por su id", async ( done ) => {
      //arrange

      //assert
      const response = await supertest(app).delete(`/api/v1/actors/6007/1`);

      //act
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", "Se ha eliminado el registro");

      done();
   });
   
   //*=====================Test getting all content of an Actor by ID
   it("Obtener todo el contenido de un actor por su id", async ( done ) => {
      //arrange
      const id = 1;

      //assert
      const response = await supertest(app).get(`/api/v1/actors/${id}/contents/3`);

      //act
      expect(response.status).toBe(200);

      done();
   });

});
