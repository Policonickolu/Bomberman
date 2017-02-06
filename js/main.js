var rootURL = "http://localhost:8080/Bomberman/rest/bomberman";

// SansId -> (connexion) -> SansPartie -> (entrerPartie) -> DansPartie -> (lancerPartie) -> EnPartie -> (fin) -> SansPartie
//							/getParties						/getPartie					-> (annuler) -> SansPartie
//							//afficherListeParties 			// afficherPartie 					//afficherPartie

var interval = null; // INTERVAL DES BOUCLES

var utilisateur = null; // ID DE l'UTILISATEUR
var currentPartie = null; // PARTIE ACTUELLE
var idPartie = null;

$menu = $('#menu');


/*checkSession();
*/

if(utilisateur == null) 
	boucle("connexion", 2000);


// _________________________CONNEXION___________________________________


function connexion(){
	$.ajax({
		type: 'GET',
		url: rootURL + "/connexion",
		dataType: "json",
		success: function(data, textStatus, jqXHR){
			if(jqXHR.status == 200){

				utilisateur = data;

				/*setSession("userid", data.id);
				setSession("usernom", data.nom);
				setSession("usernumero", data.no);*/

				etat = "SansPartie";
/*				setSession("etat", etat);
*/

				boucle("getParties",1000);
				
			}
		},
		error: function(jqXHR, textStatus, errorThrown){
			$('#message').html(
				'<div class="alert alert-dismissable alert-warning">'
				+ '<button class="close" data-dismiss="alert" type="button">×</button>'
				+ '<h4>Warning!</h4><p>' + textStatus + ', ' + errorThrown + '</p></div>'
				);
			$('#message .close').click(function(){$('#message').html("")});
			setTimeout(function(){$('#message').html("")},3000);
		}						

	});

}


function entrerPartie(id){

	var $badge = $('#' + id + ' > .badge');
	if(($badge.html() != ("4 / 4") && $badge.html() != "commencée") || (currentPartie != null && id == currentPartie.id)){

		var val = $("#nom").val();
		utilisateur.nom = (val != "" ? val : "Anonyme");
/*		setSession("usernom", utilisateur.nom );
*/		$.ajax({			
			type: 'PUT',
			headers: {"Content-Type":"application/json"},
			accept: 'application/json',
			url: rootURL + "/" + id + "/entrer",			
			dataType: "json",
			data: JSON.stringify(utilisateur),
			success: function(data, textStatus, jqXHR){
				if(jqXHR.status == 200){

					afficherPartie(data.partie);
					etat = "DansPartie";
/*					setSession("etat", etat);
*/
					currentPartie = data.partie;
					idPartie = data.partie.id;
/*					setSession("partie", data.partie.id);
*/
					utilisateur = data.utilisateur;
					/*setSession("userid", data.id);
					setSession("usernom", data.nom);
					setSession("usernumero", data.no);*/

					

					boucle("getPartie",1000);
				}
			},
			error: function(jqXHR, textStatus, errorThrown){
				$('#message').html(
					'<div class="alert alert-dismissable alert-warning">'
					+ '<button class="close" data-dismiss="alert" type="button">×</button>'
					+ '<h4>Warning!</h4><p>' + textStatus + ', ' + errorThrown + '</p></div>'
					);
				$('#message .close').click(function(){$('#message').html("")});
				setTimeout(function(){$('#message').html("")},3000);
			}		
		});
	}
}





function quitterPartie(){
	if(currentPartie != null && currentPartie.commencee != "true"){
		$.ajax({			
			type: 'PUT',
			headers: {"Content-Type":"application/json"},
			accept: 'application/json',
			url: rootURL + "/" + currentPartie.id + "/quitter",			
			dataType: "json",
			data: JSON.stringify(utilisateur),
			success: function(data, textStatus, jqXHR){
				if(jqXHR.status == 200){
					
/*					deleteSession("partie");
*/
					etat = "SansPartie";
/*					setSession("etat", etat);
*/
					boucle("getParties", 1000);

				}
			},
			error: function(jqXHR, textStatus, errorThrown){
				$('#message').html(
					'<div class="alert alert-dismissable alert-warning">'
					+ '<button class="close" data-dismiss="alert" type="button">×</button>'
					+ '<h4>Warning!</h4><p>' + textStatus + ', ' + errorThrown + '</p></div>'
					);
				$('#message .close').click(function(){$('#message').html("")});
				setTimeout(function(){$('#message').html("")},3000);

			}		
		});
	}
}

function lancerPartie(){
	if(currentPartie != null && currentPartie.commencee != "true"){
		$.ajax({			
			type: 'PUT',
			headers: {"Content-Type":"application/json"},
			accept: 'application/json',
			url: rootURL + "/" + currentPartie.id + "/lancer",			
			dataType: "json",
			data: JSON.stringify(utilisateur),
			success: function(data, textStatus, jqXHR){
				if(jqXHR.status == 200){
					etat = "EnPartie";
/*					setSession("etat", etat);
*/
					boucle("getPartie",100);
				}
			},
			error: function(jqXHR, textStatus, errorThrown){
				$('#message').html(
					'<div class="alert alert-dismissable alert-warning">'
					+ '<button class="close" data-dismiss="alert" type="button">×</button>'
					+ '<h4>Warning!</h4><p>' + textStatus + ', ' + errorThrown + '</p></div>'
					);
				$('#message .close').click(function(){$('#message').html("")});
				setTimeout(function(){$('#message').html("")},3000);

			}		
		});
	}
}


//_________________________________CONTROLE PERSO______________________________________

function deplacer(dir){
	$.ajax({			
		type: 'PUT',
		headers: {"Content-Type":"application/json"},
		accept: 'application/json',
		url: rootURL + "/" + currentPartie.id + "/" + dir,			

		data: JSON.stringify(utilisateur),
		success: function(data, textStatus, jqXHR){
			if(jqXHR.status == 200){
				
			}
		},
		error: function(jqXHR, textStatus, errorThrown){
			$('#message').html(
				'<div class="alert alert-dismissable alert-warning">'
				+ '<button class="close" data-dismiss="alert" type="button">×</button>'
				+ '<h4>Warning!</h4><p>' + textStatus + ', ' + errorThrown + '</p></div>'
				);
			$('#message .close').click(function(){$('#message').html("")});
			setTimeout(function(){$('#message').html("")},3000);
		}		
	});
}

function bomb(){
	$.ajax({			
		type: 'PUT',
		headers: {"Content-Type":"application/json"},
		accept: 'application/json',
		url: rootURL + "/" + currentPartie.id + "/" + bomb,			

		data: JSON.stringify(utilisateur),
		success: function(data, textStatus, jqXHR){
			if(jqXHR.status == 200){
				
			}
		},
		error: function(jqXHR, textStatus, errorThrown){
			$('#message').html(
				'<div class="alert alert-dismissable alert-warning">'
				+ '<button class="close" data-dismiss="alert" type="button">×</button>'
				+ '<h4>Warning!</h4><p>' + textStatus + ', ' + errorThrown + '</p></div>'
				);
			$('#message .close').click(function(){$('#message').html("")});
			setTimeout(function(){$('#message').html("")},3000);
		}		
	});
}

// ____________________________GET DONNEES_____________________________________________

function getParties(){
	$.ajax({
		type: 'GET',
		ifModified:true,
		url: rootURL,
		dataType: "json",
		success: function(data, textStatus, jqXHR){
			if(jqXHR.status == 200){

				afficherListeParties(data);

			}
		},
		error: function(jqXHR, textStatus, errorThrown){
			$('#message').html(
				'<div class="alert alert-dismissable alert-warning">'
				+ '<button class="close" data-dismiss="alert" type="button">×</button>'
				+ '<h4>Warning!</h4><p>' + textStatus + ', ' + errorThrown + '</p></div>'
				);
			$('#message .close').click(function(){$('#message').html("")});
			setTimeout(function(){$('#message').html("")},3000);
		}		
	});
}

function getPartie(id){
	$.ajax({
		type: 'GET',
		ifModified:true,
		url: rootURL + "/" + id + "/" + utilisateur.id,
		dataType: "json",
		success: function(data, textStatus, jqXHR){
			if(jqXHR.status == 200){

				currentPartie = data;
				idPartie = data.id;
/*				setSession("partie", data.id);
*/				afficherPartie(data);

			}
		},
		error: function(jqXHR, textStatus, errorThrown){
			$('#message').html(
				'<div class="alert alert-dismissable alert-warning">'
				+ '<button class="close" data-dismiss="alert" type="button">×</button>'
				+ '<h4>Warning!</h4><p>' + textStatus + ', ' + errorThrown + '</p></div>'
				);
			$('#message .close').click(function(){$('#message').html("")});
			setTimeout(function(){$('#message').html("")},3000);
		}		
	});
}

// ___________________________AFFICHAGE____________________________________________________





function afficherListeParties(data){
	$menu.html('<h3>Choix d\'une partie</h3><ul class="list-group"></ul>');

	var str = "";
	var parties = data.parties;
	for(i in parties){
		partie = parties[i];
		str += '<a id="' + partie.id + '" class="list-group-item" href="#">'
					+ '<span class="badge">' + (partie.commencee == "true" ? 'commencée' : partie.nombre + ' / 4') + '</span>'
					+ partie.nom
				+ '</a>';
		$("#menu ul").append(str);
		if(partie.commencee != "true"){
			$("#menu ul #" + partie.id).click(function(){
				entrerPartie($(this).attr("id"));
			});
		}
	}
		
}


function afficherPartie(data){		

	$menu.html('<h3>' + data.nom + ' - ' + ( data.commencee == "true" ? 'commencée': 'en attente de joueurs') + '</h3>'
		+ '<ul class="list-group">'
		+	'<a class="list-group-item" href="#">'
		+		'<span class="badge" style="background-color:white;color:black">blanc</span><span id="attr1">'
		+ (data.joueur1.utilisateur != null ? data.joueur1.utilisateur.nom : "Libre")
		+	'</span></a>'
		+	'<a class="list-group-item" href="#">'
		+		'<span class="badge" style="background-color:black">noir</span><span id="attr2">'
		+ (data.joueur2.utilisateur != null ? data.joueur2.utilisateur.nom : "Libre")
		+	'</span></a>'
		+	'<a class="list-group-item" href="#">'
		+		'<span class="badge" style="background-color:blue">bleu</span><span id="attr3">'
		+ (data.joueur3.utilisateur != null ? data.joueur3.utilisateur.nom : "Libre")
		+	'</span></a>'
		+	'<a class="list-group-item" href="#">'
		+		'<span class="badge" style="background-color:red">rouge</span><span id="attr4">'
		+ (data.joueur4.utilisateur != null ? data.joueur4.utilisateur.nom : "Libre")
		+	'</span></a><br><input class="btn btn-danger btn pull-left" value="Annuler"/><input class="btn btn-primary btn pull-right" value="Commencer"/><br><br>');

	$('#menu .btn-danger').click(function(){
		quitterPartie();
	});
	$('#menu .btn-primary').click(function(){
		lancerPartie();
	});
			
}




// _________________________COOKIES________________________________________________________

/*function setSession(nom,valeur)
{
	sessionStorage.setItem(nom,valeur);

}

function getSession(nom)
{
	return sessionStorage.getItem(nom);
}

function checkSession()
{
	var userid=getSession("userid");
	var usernom=getSession("usernom");
	var usernumero=getSession("usernumero");
	var partie=getSession("partie");
	var et = getSession("etat");

	if (userid!="" && usernom!="" && usernumero)
	  	{
	  		utilisateur = {'id':userid, 'nom':usernom, 'no':usernumero};
	  	}
	if(partie!="")
		{
			idPartie = partie;
		}
	if(et!="")
		{
			etat = et;
		}
	
}

function deleteSession(nom)
{
	sessionStorage.removeItem(nom);
}*/





function boucle(fonction, delai){
	switch(fonction){
		case "getPartie" :
			clearInterval(interval);
			getPartie(currentPartie.id);
			interval = setInterval(function(){getPartie(currentPartie.id)},delai);
			break;
		case "getParties" :
			clearInterval(interval);
			getParties();
			interval = setInterval(function(){getParties()},delai);
			break;
		case "connexion" :
			clearInterval(interval);
			connexion();
			interval = setInterval(function(){connexion()},delai);
	}
	
}

