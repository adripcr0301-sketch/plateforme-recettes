#!/bin/bash
# ========================================================
# Script de sauvegarde de la base de données
# Plateforme de recettes de cuisine
# ========================================================

DB_NAME="plateforme_recettes"
DB_USER="recettes_admin"
DB_PASS="MotDePasseAdmin2026!"
BACKUP_DIR="./backups"
DATE=$(date +"%Y%m%d_%H%M%S")
FILENAME="${BACKUP_DIR}/${DB_NAME}_${DATE}.sql"

# Créer le dossier de sauvegarde si inexistant
mkdir -p "$BACKUP_DIR"

# Lancer la sauvegarde
mysqldump \
  --user="$DB_USER" \
  --password="$DB_PASS" \
  --single-transaction \
  --routines \
  --triggers \
  "$DB_NAME" > "$FILENAME"

# Vérifier si la sauvegarde a réussi
if [ $? -eq 0 ]; then
  echo "Sauvegarde réussie : $FILENAME"
else
  echo "Erreur lors de la sauvegarde !"
  exit 1
fi
