package services;


public class Terrain {
	
	private Case[][] cases = new Case[13][13];
	private int tailleCase;
	private int width;
	private int height;
		
	public Terrain(Joueur[] joueurs){
		
		int i, j;
		
		for(i = 0; i < 13; i++){
			for(j = 0; j < 13; j++){
				this.cases[j][i] = new Case();
			}
		}
		
		for(i = 1; i < cases.length-1; i = i + 2){
			for(j = 1; j < cases[0].length-1; j = j + 2){
				this.cases[j][i].setEtat(EtatCase.MUR);
			}
		}
		
		for(i = 0; i < cases.length; i++){
			for(j = 0; j < cases[0].length; j = ( i % 2 == 0 ? j+1 : j+2 ) ){
				int r = (int) (Math.random()*100);
				
				if(r > 11 &&
						!((i == 0 || i == 12) && (j == 0 || j == 1 || j == 11 || j == 12) ||
							(i == 1 || i == 11) && (j == 0 || j == 12)) ||
						
						((i == 0 || i == 12) && (j == 2 || j == 10) ||
							(i == 2 || i == 10) && (j == 0 || j == 12))
					){
					this.cases[j][i].setEtat(EtatCase.ROCHE);
				}
			}
		}
		
		
		for(i = 0; i < cases.length; i++){
			String s = "";
			for(j = 0; j < cases[0].length; j++){
				EtatCase etat = cases[j][i].getEtat();
				if(etat == EtatCase.MUR){
					s += " M ";
				}else if(etat == EtatCase.ROCHE){
					s += " X ";
				}else if(etat == EtatCase.VIDE){
					s += " O ";
				}
			}
			System.out.println(s);
		}
				
		this.tailleCase = cases[0][0].getTaille();
		this.width = tailleCase * cases[0].length;
		this.height = tailleCase * cases.length;
		
	}
	
	
	public Case[][] getCases() {
		return cases;
	}

	public void setCases(Case[][] cases) {
		this.cases = cases;
	}



	public int getTailleCase() {
		return tailleCase;
	}

	public void setTailleCase(int tailleCase) {
		this.tailleCase = tailleCase;
	}

	public int getWidth() {
		return width;
	}

	public void setWidth(int width) {
		this.width = width;
	}

	public int getHeight() {
		return height;
	}

	public void setHeight(int height) {
		this.height = height;
	}

	public void deplacerDroite(Joueur joueur) {
		Position p = joueur.getPosition();
		int i = joueur.getVitesse();
		while(i > 0){
			i--;
		}
		if(p.getX()<this.width-1)
			p.setX(p.getX()+1);
	}

	public void deplacerGauche(Joueur joueur) {
		Position p = joueur.getPosition();
		int i = joueur.getVitesse();
		while(i > 0){
			i--;
		}
		if(p.getX()>0)
			p.setX(p.getX()-1);
	}

	public void deplacerHaut(Joueur joueur) {
		Position p = joueur.getPosition();
		int i = joueur.getVitesse();
		while(i > 0){
			i--;
		}
		if(p.getY()>0)
			p.setY(p.getY()-1);
	}


	public void deplacerBas(Joueur joueur) {
		Position p = joueur.getPosition();
		int i = joueur.getVitesse();
		while(i > 0){
			i--;
		}
		if(p.getY()<this.height-1)
			p.setY(p.getY()+1);
	}
	
	public void bomber(Joueur joueur) {
		// Imposible pour le moment.
	}
	
}
