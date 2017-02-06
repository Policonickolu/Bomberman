package services;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.OPTIONS;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.EntityTag;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;


@Path("bomberman")
public class Bomberman {
	
	private static int compteur = 1;
	private static List<Partie> parties = new ArrayList<Partie>();

	private static int tag = 1;
	
	private String m_corsHeaders;
	
	public Bomberman() {
		if(compteur == 1){
			parties.add(new Partie("Partie 1"));

		}
		compteur++;
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getParties( @Context HttpHeaders httpheaders) {
		if((tag+"").equals(httpheaders.getRequestHeaders().getFirst("if-none-match"))){
			return Response.status(304).build();
		}else{
			String s = titrePartiesToJSON();			
			return Response.status(200).header("Access-Control-Allow-Origin", "null")
					.entity(s).type(MediaType.APPLICATION_JSON).tag(eTag(tag)).build();
		}
		
	}
	
	@GET
	@Path("/{uniqueIdParty}/{uniqueIdUser}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getPartie( @PathParam("uniqueIdParty") String idPartie,
							@PathParam("uniqueIdUser") String idUser,
							@Context HttpHeaders httpheaders ) {
		
		if((tag+"").equals(httpheaders.getRequestHeaders().getFirst("if-none-match"))){
			return Response.status(304).build();
		}else{
			Partie partie = idToPartie(idPartie);
			if(partie == null){
				return Response.status(404).header("Access-Control-Allow-Origin", "null").build();
			}else{
				String s = partie.toJSON(idUser);			
				return Response.status(200).header("Access-Control-Allow-Origin", "null")
						.entity(s).type(MediaType.APPLICATION_JSON).build();
			}
		}
	}
	
	@PUT
	@Path("/{uniqueIdParty}/entrer")
	@Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
	public Response entrerPartie(Utilisateur user, @PathParam("uniqueIdParty") String id) {
		
		Partie partie = idToPartie(id);
		if(partie == null ){
			return makeCORS(Response.status(404));
		}else{
			if(!isDejaDansPartie(user)){
				partie.entrerPartie(user);
			}
			tag=tag+1;
			return makeCORS(Response.ok().entity("{\"utilisateur\":" + user.toJSON(user.getId()) + ",\"partie\":" + partie.toJSON(user.getId()) + "}").type(MediaType.APPLICATION_JSON));
		}
		
	}
	
	@PUT
	@Path("/{uniqueIdParty}/quitter")
	@Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
	public Response quitterPartie(Utilisateur user, @PathParam("uniqueIdParty") String id) {
		
		Partie partie = idToPartie(id);
		if(partie == null ){
			return makeCORS(Response.status(404));
		}else{
			partie.quitterPartie(user);	
			tag=tag+1;
			return makeCORS(Response.ok().entity(user.toJSON(user.getId())).type(MediaType.APPLICATION_JSON));

		}
		
	}
	
	@PUT
	@Path("/{uniqueIdParty}/lancer")
	@Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
	public Response lancerPartie(Utilisateur user, @PathParam("uniqueIdParty") String id) {
		
		Partie partie = idToPartie(id);
		if(partie == null ){
			return makeCORS(Response.status(404));
		}else{
			partie.lancerPartie();	
			tag=tag+1;
			return makeCORS(Response.ok().entity(user.toJSON(user.getId())).type(MediaType.APPLICATION_JSON));

		}
		
	}
	
	@PUT
	@Path("/{uniqueIdParty}/droite")
    @Consumes(MediaType.APPLICATION_JSON)
	public Response deplacerDroite(Utilisateur user, @PathParam("uniqueIdParty") String id) {
		
		Partie partie = idToPartie(id);
		
		if(partie == null ){
			return makeCORS(Response.status(404));
		}else{
			partie.deplacerDroite(user);
			tag=tag+1;
			return makeCORS(Response.ok().entity(partie.toJSON(user.getId())).type(MediaType.APPLICATION_JSON));					
	
		}
		
	}
	
	@PUT
	@Path("/{uniqueIdParty}/gauche")
    @Consumes(MediaType.APPLICATION_JSON)
	public Response deplacerGauche(Utilisateur user, @PathParam("uniqueIdParty") String id) {
		

		Partie partie = idToPartie(id);
		
		if(partie == null ){
			return makeCORS(Response.status(404));
		}else{
			partie.deplacerGauche(user);
			
			tag=tag+1;

			return makeCORS(Response.ok().entity(partie.toJSON(user.getId())).type(MediaType.APPLICATION_JSON));					
	
		}
		
	}	
	
	@PUT
	@Path("/{uniqueIdParty}/haut")
    @Consumes(MediaType.APPLICATION_JSON)
	public Response deplacerHaut(Utilisateur user, @PathParam("uniqueIdParty") String id) {
		

		Partie partie = idToPartie(id);
		
		if(partie == null ){
			return makeCORS(Response.status(404));
		}else{
			partie.deplacerHaut(user);
			
			tag=tag+1;

			return makeCORS(Response.ok().entity(partie.toJSON(user.getId())).type(MediaType.APPLICATION_JSON));					
	
		}
		
	}	
	
	@PUT
	@Path("/{uniqueIdParty}/bas")
    @Consumes(MediaType.APPLICATION_JSON)
	public Response deplacerBas(Utilisateur user, @PathParam("uniqueIdParty") String id) {
		

		Partie partie = idToPartie(id);
		
		if(partie == null ){
			return makeCORS(Response.status(404));
		}else{
			partie.deplacerBas(user);
			
			tag=tag+1;
			return makeCORS(Response.ok().entity(partie.toJSON(user.getId())).type(MediaType.APPLICATION_JSON));					
	
		}
		
	}	
	
	@PUT
	@Path("/{uniqueIdParty}/bomb")
    @Consumes(MediaType.APPLICATION_JSON)
	public Response bomber(Utilisateur user, @PathParam("uniqueIdParty") String id) {
		

		Partie partie = idToPartie(id);
		
		if(partie == null ){
			return makeCORS(Response.status(404));
		}else{
			partie.bomber(user);
			
			tag=tag+1;
			
			return makeCORS(Response.ok().entity(partie.toJSON(user.getId())).type(MediaType.APPLICATION_JSON));					
	
		}
		
	}	
	
	@GET
	@Path("/connexion")
	@Produces(MediaType.APPLICATION_JSON)
	public Response connexion() {
		Utilisateur user = new Utilisateur();
		return Response.status(200).header("Access-Control-Allow-Origin", "null")
				.entity(user.toJSON(user.getId())).type(MediaType.APPLICATION_JSON).build();
	}
	
	
	private EntityTag eTag(int value){
		return new EntityTag(String.valueOf(value));
	}
	
	private boolean isDejaDansPartie(Utilisateur u){

		Iterator<Partie> it = parties.iterator();
		while(it.hasNext()){
			Partie p = it.next();
			Joueur[] joueurs= p.getJoueurs();
			for(Joueur j : joueurs){
				if(j.getUtilisateur() != null && j.getUtilisateur().getId().equals(u.getId())){
					return true;
				}
			}
			
		}
		return false;
		
	}
	
	private Partie idToPartie(String id){
		
		Iterator<Partie> it = parties.iterator();
		while(it.hasNext()){
			Partie p = it.next();
			if(id.equals(p.getId())){
				return p;
			}
		}
		return null;
	}	
	
	private String titrePartiesToJSON(){
		String s = "{ \"parties\" : [";
		int i = parties.size()-1;
		int j = 0;
		for(Partie p : parties){
			s += p.titrePartieToJSON();
			if(i!=j){
				s += ",";
			}
			j++;
		}
		s+= "]}";
		return s;
	}
	
	
	@OPTIONS
	@Path("/{uniqueIdParty}/entrer")
	public Response makeOptions1( @HeaderParam("Access-Control-Request-Headers") String requestH){
		m_corsHeaders = requestH;
		return makeCORS(Response.ok(), requestH);
	}
	
	@OPTIONS
	@Path("/{uniqueIdParty}/quitter")
	public Response makeOptions2( @HeaderParam("Access-Control-Request-Headers") String requestH){
		m_corsHeaders = requestH;
		return makeCORS(Response.ok(), requestH);
	}
	
	@OPTIONS
	@Path("/{uniqueIdParty}/droite")
	public Response makeOptions3( @HeaderParam("Access-Control-Request-Headers") String requestH){
		m_corsHeaders = requestH;
		return makeCORS(Response.ok(), requestH);
	}
	
	@OPTIONS
	@Path("/{uniqueIdParty}/gauche")
	public Response makeOptions4( @HeaderParam("Access-Control-Request-Headers") String requestH){
		m_corsHeaders = requestH;
		return makeCORS(Response.ok(), requestH);
	}
	
	@OPTIONS
	@Path("/{uniqueIdParty}/haut")
	public Response makeOptions5( @HeaderParam("Access-Control-Request-Headers") String requestH){
		m_corsHeaders = requestH;
		return makeCORS(Response.ok(), requestH);
	}
	
	@OPTIONS
	@Path("/{uniqueIdParty}/bas")
	public Response makeOptions6( @HeaderParam("Access-Control-Request-Headers") String requestH){
		m_corsHeaders = requestH;
		return makeCORS(Response.ok(), requestH);
	}
	
	@OPTIONS
	@Path("/{uniqueIdParty}/bomb")
	public Response makeOptions7( @HeaderParam("Access-Control-Request-Headers") String requestH){
		m_corsHeaders = requestH;
		return makeCORS(Response.ok(), requestH);
	}
	
	@OPTIONS
	@Path("/{uniqueIdParty}/lancer")
	public Response makeOptions8( @HeaderParam("Access-Control-Request-Headers") String requestH){
		m_corsHeaders = requestH;
		return makeCORS(Response.ok(), requestH);
	}
	
	private Response makeCORS(ResponseBuilder req, String returnMethod){
		
		ResponseBuilder rb = req.header("Access-Control-Allow-Origin", "*")
				.header("Access-Control-Allow-Methods", "GET, PUT, POST, OPTIONS");
		
		if(!"".equals(returnMethod)){
			rb.header("Access-Control-Allow-Headers", returnMethod);
		}
		
		return rb.build();
		
	}
	
	private Response makeCORS(ResponseBuilder req){
		return makeCORS(req, m_corsHeaders);
	}
	
}
