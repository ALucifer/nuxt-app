test
- Utiliser la façon de nuxt pour loader les requete de recuperation des data
- utiliser le asyncData pour les page suivante:
  - profile/messages
  - profile/tournoi

  - prendre en compte l'avatar de chaque équipe

- mes matches

  - faire un filtre sur les matchs de l'utilisateurs
  - Ne pas affiche le message sur l'utilisateur à entré un justificatif
  - Afficher le bouton si aucun justificatif est inséré

- tab suivi

  - Dans la partie action, ajouter un bouton qui ouvre la modale de selection du vainqueur.
  - On devra afficher les justificatifs de chaque equipe pour pouvoir selectionner le vainqueur

- profile
  - changer la vue principale
  - trouver un moyen d'avoir un sous menu pour le profile

API:

- mettre en event les envoie d'email
- voir pour mettre un event sur les notifications aussi

info:
que se passe-t-il si il n'y a pas de challongeID sur tournament et que le user s'inscrit ??


## De quoi à besoin à admin de tournoi ?

### En informations:
  - Nom du tournoi
  - Nombre de participants (total et inscrit)
  - Format
  - Voir les matches
  - L'arbre du tournoi
  - Si il y a eu un probleme de linking entre le site et challonge
  - Voir le listing des equipes

### En actions
  - Lancer le tournoi
  - Dire quel match est gagnant ou non quand il y a un désaccord
  - Pouvoir l'éditer si il n'est pas déjà démarré 

## Sécurité
- About => anony => ok
- Contact => anony => ok
- Home => anony => ok
- Login => anony only => ok
- Register => anony only => ok
- Reset-password => anony only
- tournoi
  - index => anony => ok
  - create => logged => ok
  - id => anony => ok
  - register => logged => ok
