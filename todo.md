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
- [x] passer pinia sous la nouvelle forme
- [x] enlever tout les call api depuis pinia, ne plus s'en servir de BDD

## feature/v0.0.5
- [x] Stylelistic de l'ESLint
- [x] Mettre ESLint sur github
- [x] Revoir le register form d'un tournoi
- [x] Remettre le chat
- [x] Pouvoir ajouter des messages flash depuis la partie serveur, par exemple quand une page est innacessible (ex: register)

## feature/v0.0.6
- [x] Regler le warning dans la console
- [x] Mise en place de quelques tests
- [x] Page d'erreur a styliser avec un footer et center le content
- [x] Pour les formulaires, il faudrait une validation cote serveur

## feature/v0.0.7
- [ ] Voir pourquoi on a des erreur sur le loading des images (IPX)
- [ ] Partie 1 des tests
- [ ] Faire le profile user (design)
- [ ] Chat: regler le probleme de scroll quand on change de conversation puis qu'on revient, cela declenche l'infinite scroll car il est tout en haut
- [ ] Chat: mettre en place une nouvelle conversation

## feature/v0.0.8
- [ ] Chat: lecture d'un nouveau message
- [ ] Partie 2 des tests
- [ ] Chat: envoi en SSE d'un message
- [ ] Fixer les vulnerabilités indiqué par github

## feature/v0.0.9
- [ ] Partie 3 des tests
- [ ] Utilise le module de font de nuxt
- [ ] Partie 4 des tests
- [ ] Retirer la date du formulaire de recherche
- [ ] Faire en sorte que toute la partie recherche apparaisse en meme temps

## feature/v0.0.10
- [ ] Corriger le lien dans le mail de reset password
- [ ] Ajouter un bouton reset sur le listing des tournois quand on a pas de données ou bien que le formulaire ai été soumis puis reset


## A groomer
- [ ] Probleme lors de l'inscription puis de la desinscription (point B)
- [ ] Utilise nuxt icon
- [ ] Correction des erreurs dans nuxt.config.ts

- [ ] Partie 5 des tests
- [ ] Intenationnalisation
- [ ] Lors de la creation d'un tournoi, la description soumet le formulaire, faire en sorte qu'elle ne le soumet pas
- [ ] Formulaire de renseignement des scores

- afficher le match avec le score sur /matchs/{id}
- voir comment gérer le score final
- modal form des scores


## Points

### B
Quand on arrive sur la page d'inscription et qu'on s'inscrit, il y a un probleme avec le unsubscribe.
Cela fonctionne bien mais on a quand meme un flash message d'erreur "Une erreur est survenu"