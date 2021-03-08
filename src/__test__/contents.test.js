import supertest from "supertest";
import app from "../index";
import { Contents } from "../models";


describe("Probando peticiones de Contenidos", ( ) => {

   afterAll(async (done) => {
      await Contents.destroy({where: { title: "Los bandidos de río Frío"}});
      done()
   });
   
   //*=====================Test singup New Actors
   it("Agregando un nuevo contenido", async ( done ) => {
      //arrange
      let contentObj = {
         "id_Content_Type": 2,
         "title": "Los bandidos de río Frío",
         "imdb_score": 8.5,
         "release_dates": "1981",
         "play_time": "1h 45min",
         "total_episodes": 3,
         "imdb_link": "http://www.imdb.com/title/tt1475582/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=2398042182&pf_rd_r=0J30GWKBJCBE25N9PV5E&pf_rd_s=center-1&pf_rd_t=15506&pf_rd_i=toptv&ref_=chttvtp_tt_15",
         "imdb_score_votes": 55555	
      };

      //assert
      const response = await supertest(app).post("/api/v1/contents/2").send(contentObj);

      //act
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("message", "Registro exitoso");

      done();
   });
   
   //*=====================Test getting Contents
   it("Obteniendo todos los contents", async ( done ) => {
      //arrange

      //assert
      const response = await supertest(app).get("/api/v1/contents/3");

      //act
      expect(response.status).toBe(200);

      done();
   });
   
   //*=====================Test getting Content by ID
   it("Obteniendo un contenido por su id", async ( done ) => {
      //arrange
      const id = 1;

      //assert
      const response = await supertest(app).get(`/api/v1/contents/${id}/1`);

      //act
      expect(response.status).toBe(200);

      done();
   });
   
   //*=====================Test editing Content by ID
   it("Modificar un actor por su id", async ( done ) => {
      //arrange
      let contentObj = {
         "id_Content_Type": 2,
         "title": "Lola la Camionera",
         "imdb_score": 8.5,
         "release_dates": "1981",
         "play_time": "1h 45min",
         "total_episodes": 3,
         "imdb_link": "http://www.imdb.com/title/tt1475582/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=2398042182&pf_rd_r=0J30GWKBJCBE25N9PV5E&pf_rd_s=center-1&pf_rd_t=15506&pf_rd_i=toptv&ref_=chttvtp_tt_15",
         "imdb_score_votes": 55555	
      };

      //assert
      const response = await supertest(app).put(`/api/v1/contents/501/2`).send(contentObj);

      //act
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", "El registro del contenido ha sido modificado");

      done();
   });
   
   //*=====================Test deleting Content by ID
   it("Eliminar un contenido por su id", async ( done ) => {
      //arrange

      //assert
      const response = await supertest(app).delete(`/api/v1/contents/501/1`);

      //act
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", "Se ha eliminado el registro");

      done();
   });
   
   //*=====================Test getting all actors of a Content by ID
   it("Obtener todos los actores de un contenido por su id", async ( done ) => {
      //arrange
      const id = 1;

      //assert
      const response = await supertest(app).get(`/api/v1/contents/${id}/actors/3`);

      //act
      expect(response.status).toBe(200);

      done();
   });
   
   //*=====================Test getting all directors of a Content by ID
   it("Obtener todos los directores de un contenido por su id", async ( done ) => {
      //arrange
      const id = 1;

      //assert
      const response = await supertest(app).get(`/api/v1/contents/${id}/directors/3`);

      //act
      expect(response.status).toBe(200);

      done();
   });
   
   //*=====================Test getting all directors of a Genre by ID
   it("Obtener todos los géneros de un contenido por su id", async ( done ) => {
      //arrange
      const id = 1;

      //assert
      const response = await supertest(app).get(`/api/v1/contents/${id}/genres/3`);

      //act
      expect(response.status).toBe(200);

      done();
   });

});
