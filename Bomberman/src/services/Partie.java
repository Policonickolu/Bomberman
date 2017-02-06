package services;

import java.util.UUID;


public class Partie {

	private String id;
	private String nom;
	private Joueur[] joueurs = new Joueur[4];
	private int nombre = 0;
	private boolean commencee = false;
	
	private Terrain terrain;
	
	public Partie(String nom){
		this.id = "" + UUID.randomUUID();
		this.nom = nom;
		this.joueurs[0] = new Joueur(new Position(0,0), Couleur.BLANC);
		this.joueurs[1] = new Joueur(new Position(0,12), Couleur.NOIR);
		this.joueurs[2] = new Joueur(new Position(12,0), Couleur.BLEU);
		this.joueurs[3] = new Joueur(new Position(12,12), Couleur.ROUGE);
		
		this.terrain = new Terrain(this.joueurs);
	}
	
	public void entrerPartie(Utilisateur u){
		
		if(this.commencee == false && this.nombre >= 0 && this.nombre < 4){
			joueurs[this.nombre].setUtilisateur(u);
			u.setNo(this.nombre+"");
			this.nombre++;
		}
	
	}
	
	public void quitterPartie(Utilisateur u){
		int i = Integer.parseInt(u.getNo());
		if(this.commencee == false && i != -1){
			if(joueurs[i].getUtilisateur().getId().equals(u.getId())){
				joueurs[i].setUtilisateur(null);
				u.setNo(null);
				this.nombre--;
			}
		}	
	}
	
	public void deplacerDroite(Utilisateur u){
		int i = Integer.parseInt(u.getNo());
		if(this.commencee == true)
			this.terrain.deplacerDroite(joueurs[i]);	
	}
	
	public void deplacerGauche(Utilisateur u){
		int i = Integer.parseInt(u.getNo());
		if(this.commencee == true)
			this.terrain.deplacerGauche(joueurs[i]);				
	}
	
	public void deplacerHaut(Utilisateur u){
		int i = Integer.parseInt(u.getNo());
		if(this.commencee == true)
			this.terrain.deplacerHaut(joueurs[i]);
					
	}
	
	public void deplacerBas(Utilisateur u){
		int i = Integer.parseInt(u.getNo());
		if(this.commencee == true)
			this.terrain.deplacerBas(joueurs[i]);
	}
	
	public void bomber(Utilisateur u){
		int i = Integer.parseInt(u.getNo());
		if(this.commencee == true)
			this.terrain.bomber(joueurs[i]);
	}
	
	public String getId(){
		return this.id;
	}
	
	public String getNom(){
		return this.nom;
	}
	
	public Joueur[] getJoueurs(){
		return this.joueurs;
	}
	
	public int getNombre(){
		return this.nombre;
	}
	
	public String titrePartieToJSON(){
		return "{ \"id\" : \"" + this.id + "\","
				+ "\"nom\" : \"" + this.nom + "\","
				+ "\"commencee\" : \"" + this.commencee + "\","
				+ "\"nombre\" : \"" + this.nombre + "\" }";
	}
	
	public String toJSON(String id){
		return "{ \"id\" : \"" + this.id + "\","
				+ "\"nom\" : \"" + this.nom + "\","
				+ "\"nombre\" : \"" + this.nombre + "\","
				+ "\"commencee\" : \"" + this.commencee + "\","
				+ "\"joueur1\" : " + this.joueurs[0].toJSON(id) + ","
				+ "\"joueur2\" : " + this.joueurs[1].toJSON(id) + ","
				+ "\"joueur3\" : " + this.joueurs[2].toJSON(id) + ","
				+ "\"joueur4\" : " + this.joueurs[3].toJSON(id) + " }";
	}

	public void lancerPartie() {
		if(this.nombre > 0){
			this.commencee = true;
		}
		
	}
	
	
	
}
