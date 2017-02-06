var rootURL = "http://localhost:8080/Bomberman/rest/bomberman";


var interval; // INTERVAL DES BOUCLES

var utilisateur = null; // ID DE l'UTILISATEUR
var currentPartie = null; // PARTIE ACTUELLE

// LE BUT EST DE METTRE UN UTILISATEUR AVEC UN UNIQUE ID
// IL POURRA RIEN FAIRE SANS ID
// VOILA HMM {'id':utilisateur.id,'nom':utilisateur.nom,'derniereReponse':utilisateur.derniereReponse}
// DONC UN NOMBRE DE PARTIES LIMITE DEJA CREES
// L'UTILISATEUR NE DOIT PAS SQUATTER 2 PARTIES
// TIMER POUR GUETTER QUE LE GARS NE SE CASSE PAS DE LA PARTIE, REPONSE TOUTES LES TANT DE SECONDES variable LASTREPONSE
// CEUX QUI REJOINGNET UNE PARTIES DOIVENT APPUYER SUR LANCER, FAUT QUE LE NOMBRE DE VOTANT = NB DE PRESENTS, MAIS AU MOINS 2.



checkCookie();

if(utilisateur != null){
	if(currentPartie != null){
		afficherPartie();
		if(currentPartie.commencee == "true"){
			lancerPartie();
		}else{			
			interval = setInterval(function(){
				afficherPartie();
			}, 1000);
		}
	}else{
		afficherParties();
		interval = setInterval(function(){
			afficherParties();
		}, 1000);
	}
}else{
	currentPartie = null;
	setCookie("partie","");
	connexion();
	interval = setInterval(function(){
		connexion();
	}, 1000);
}




function connexion(){
	$.ajax({
		type: 'GET',
		url: rootURL + "/connexion",
		dataType: "json",
		success: function(data, textStatus, jqXHR){
			if(jqXHR.status == 200){
				utilisateur = data;
				setCookie("userid", data.id);
				setCookie("usernom", data.nom);
				setCookie("usernumero", data.no);
				clearInterval(interval);
				afficherParties();
				interval = setInterval(function(){
					afficherParties();
				}, 1000);
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



function afficherParties(){
	$.ajax({
		type: 'GET',
		ifModified:true,
		url: rootURL,
		dataType: "json",
		success: function(data, textStatus, jqXHR){
			if(jqXHR.status == 200){
				$('#menu').html('<h3>Choix d\'une partie</h3><ul class="list-group"></ul>');
				
				parties = data.parties;
				for(i in parties){
					partie = parties[i];
					$('#menu ul').append(
							'<a id="' + partie.id + '" class="list-group-item" href="#">'
								+ '<span class="badge">' + (partie.commencee == "true" ? 'commencée' : partie.nombre + ' / 4') + '</span>'
								+ partie.nom
							+ '</a>'
						);
					if(partie.commencee != "true"){
						$("#menu ul #" + partie.id).click(function(){
							entrerPartie($(this).attr("id"));
						});
					}
				}	

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

	if($('#' + id + ' > .badge').html() != ("4 / 4")){

		var val = $("#nom").val();
		utilisateur.nom = (val != "" ? val : "Anonyme");
		setCookie("usernom", utilisateur.nom );
		$.ajax({			
			type: 'PUT',
			headers: {"Content-Type":"application/json"},
			accept: 'application/json',
			url: rootURL + "/" + id + "/entrer",			
			dataType: "json",
			data: JSON.stringify(utilisateur),
			success: function(data, textStatus, jqXHR){
				if(jqXHR.status == 200){
					currentPartie = data.partie;
					utilisateur = data.utilisateur;
					setCookie("partie", data.id);
					
					clearInterval(interval);
					afficherPartie();
					interval = setInterval(function(){
						afficherPartie();
					}, 1000);
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

var menu = null;
var attr1 = null;
var attr2 = null;
var attr3 = null;
var attr4 = null;
function afficherPartie(){
	$.ajax({
		type: 'GET',
		ifModified:true,
		url: rootURL + "/" + currentPartie.id + "/" + utilisateur.id,
		dataType: "json",
		success: function(data, textStatus, jqXHR){
			if(jqXHR.status == 200){
				if(currentPartie.commencee != data.commencee){
					if(data.commencee == "true"){
						clearInterval(interval);
						afficherPartie();
						interval = setInterval(function(){
							afficherPartie();
						}, 100);
					}else{
						clearInterval(interval);
						afficherPartie();
						interval = setInterval(function(){
							afficherPartie();
						}, 1000);
					}
				}

				else
				currentPartie = data;
				if(attr1 != null){
					attr1.html((data.joueur1.utilisateur != null ? data.joueur1.utilisateur.nom : "Libre"));
					attr2.html((data.joueur2.utilisateur != null ? data.joueur2.utilisateur.nom : "Libre"));
					attr3.html((data.joueur3.utilisateur != null ? data.joueur3.utilisateur.nom : "Libre"));
					attr4.html((data.joueur4.utilisateur != null ? data.joueur4.utilisateur.nom : "Libre"));
				}else{
					menu = $('#menu');
					attr = $('#menu ul a .attr');
					attr1 = attr[0];
					attr2 = attr[1];
					attr3 = attr[2];
					attr4 = attr[3];
					menu.html('<h3>' + data.nom + ' - ' + ( data.commencee == "true" ? 'commencée': 'en attente de joueurs') + '</h3>'
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
			currentPartie == null;
			clearInterval(interval)
			afficherParties();
			interval = setInterval(function(){
						afficherParties();
					}, 1000);
		}		
	});
}



function quitterPartie(){
	if(currentPartie.commencee != "true"){
		$.ajax({			
			type: 'PUT',
			headers: {"Content-Type":"application/json"},
			accept: 'application/json',
			url: rootURL + "/" + currentPartie.id + "/quitter",			
			dataType: "json",
			data: JSON.stringify(utilisateur),
			success: function(data, textStatus, jqXHR){
				if(jqXHR.status == 200){
					currentPartie == null;
					setCookie("partie","");
					clearInterval(interval);
					afficherParties();
					interval = setInterval(function(){
						afficherParties();
					}, 1000);
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
				currentPartie == null;
				clearInterval(interval)
				afficherParties();
				interval = setInterval(function(){
							afficherParties();
						}, 1000);
			}		
		});
	}
}

function lancerPartie(){
	if(currentPartie.commencee != "true"){
		$.ajax({			
			type: 'PUT',
			headers: {"Content-Type":"application/json"},
			accept: 'application/json',
			url: rootURL + "/" + currentPartie.id + "/lancer",			
			dataType: "json",
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
				currentPartie == null;
				clearInterval(interval)
				afficherParties();
				interval = setInterval(function(){
							afficherParties();
						}, 1000);
			}		
		});
	}
}

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


function setCookie(cname,cvalue)
{
	document.cookie = cname+"="+cvalue;
}

function getCookie(cname)
{
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) 
	  {
	  var c = ca[i].trim();
	  if (c.indexOf(name)==0) return c.substring(name.length,c.length);
	  }
	return "";
}

function checkCookie()
{
	var userid=getCookie("userid");
	var usernom=getCookie("usernom");
	var usernumero=getCookie("usernumero");
	var partie=getCookie("partie");

	if (userid!="" && usernom!="" && usernumero)
	  	{
	  		utilisateur = {'id':userid, 'nom':usernom, 'no':usernumero};
	  	}
	if(partie!="")
		{
			currentPartie = {'id':partie};
		}
	
}



