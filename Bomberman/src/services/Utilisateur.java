package services;

import java.util.UUID;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Utilisateur {
	
	private String id;
	private String nom;
	private String no;
		
	public Utilisateur(){
		this.id = UUID.randomUUID()+"";
		this.nom = "Anonyme";
		this.no = "-1";
	}
	
	public Utilisateur(String id, String nom, String no){
		this.id = id;
		this.nom = nom;
		this.no = no;
	}
	
	
	public String getId() {
		return id;
	}



	public void setId(String id) {
		this.id = id;
	}



	public String getNom() {
		return nom;
	}

	public String getNo() {
		return no;
	}

	public void setNo(String no) {
		this.no = no;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String toJSON(String id){
		return "{ \"id\" : \"" + (this.id.equals(id)? this.id : "null") + "\","
				+ "\"nom\" : \"" + this.nom + "\","
				+ "\"no\" : \"" + this.no + "\" }";
	}

	
}
