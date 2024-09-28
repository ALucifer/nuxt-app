# TODO

## feature/v.0.0.1
- [x] Afficher le boutton pour s'inscrire à un tournoi, meme si on est pas loggé
- [x] Ne pas afficher le panel 2 si on a pas d'equipe ou de matchs
- [x] Rendre la description d'un tournoi obligatoire
- [x] Rendre l'inscription en mode sans validation a chaque focus enlevé
- [x] Probleme sur le slider qui est plus en automatique
- [x] Sur le profile, créer un composant pour le listing des tournois que je dois rendre alive avec keepAlive
## feature/v.0.0.2
- [x] Installation du module ESLINT
- [x] Correction de 1/4 des erreurs ESLINT
- [x] middleware pour ne pas pouvoir accéder au register tournament si le challongeId n'est pas présent
- [x] Mise a jour des dependances
- [x] Rendre le unsubscribe et start du component DropdownAction de tournament

## feature/v0.0.3
- [x] Sortir les objets yup des vue pour pouvoir typer plus facilement
- [x] Supprimer les components inutilisés
- [x] Passer tout les composable sous const

## feature/v0.0.4
- [ ] passer pinia sous la nouvelle forme
- [ ] enlever tout les call api depuis pinia, ne plus s'en servir de BDD

## feature/v0.0.5
- [ ] Stylelistic de l'ESLint
- [ ] Revoir le register form d'un tournoi
- [ ] Pouvoir ajouter des messages flash depuis la partie serveur

## A groomer
- [ ] Mise en place de quelques tests
- [ ] Lors de la créer la description soumet le formulaire, faire en sorte qu'elle ne le soumet pas
- [ ] Formulaire de renseignement des scores
- [ ] Systeme de notification 
- [ ] Remettre le chat
- [ ] Voir pourquoi on a des erreur sur le loading des images (IPX)

- afficher le match avec le score sur /matchs/{id}
- voir comment gérer le score final
- modal form des scores