package services;


public class Joueur {
	
	private Utilisateur utilisateur = null;
	
	private Position position;
	private Couleur couleur;
	
	private int porteeBombe = 1;
	private int vitesse = 1000000000;
	
	public Joueur(Position p, Couleur couleur){
		this.position = p;
		this.couleur = couleur;
	}
	
	public Utilisateur getUtilisateur() {
		return utilisateur;
	}

	public void setUtilisateur(Utilisateur utilisateur) {
		this.utilisateur = utilisateur;
	}

	public Position getPosition() {
		return position;
	}

	public void setPosition(Position position) {
		this.position = position;
	}

	public Couleur getCouleur() {
		return couleur;
	}

	public void setCouleur(Couleur couleur) {
		this.couleur = couleur;
	}

	public int getPorteeBombe() {
		return porteeBombe;
	}

	public void setPorteeBombe(int porteeBombe) {
		this.porteeBombe = porteeBombe;
	}

	public int getVitesse() {
		return vitesse;
	}

	public void setVitesse(int vitesse) {
		this.vitesse = vitesse;
	}
	
	public String toJSON(String id){
		return "{ \"utilisateur\" : " + (this.utilisateur != null ? this.utilisateur.toJSON(id) : "null") + ","
				+ "\"position\" : " + this.position.toJSON() + ","
				+ "\"couleur\" : \"" + this.couleur.getNom() + "\","
				+ "\"porteeBombe\" : \"" + this.porteeBombe + "\","
				+ "\"vitesse\" : \"" + this.vitesse + "\" }";
	}

}
