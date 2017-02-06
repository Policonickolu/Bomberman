package services;

public enum Couleur {
	BLANC("blanc"), NOIR("noir"), BLEU("bleu"), ROUGE("rouge");
	
	private final String nom;

	Couleur(String nom) {
		this.nom = nom;
	}

	public String getNom() {
		return this.nom;
	}

	public static Couleur getCouleur(String str) {
		Couleur[] couleurs = Couleur.values();
		Couleur couleur = null;

		for (Couleur cou : couleurs) {
			if (cou.getNom().equals(str)) {
				couleur = cou;
			}

		}
		return couleur;
	}
}
