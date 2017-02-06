package services;

public class Case {
	
	private EtatCase etat = EtatCase.VIDE;
	private int taille = 51;
	
	public Case(){
	}

	public EtatCase getEtat() {
		return etat;
	}

	public void setEtat(EtatCase etat) {
		this.etat = etat;
	}

	public int getTaille() {
		return taille;
	}

	public void setTaille(int taille) {
		this.taille = taille;
	}
	
}
