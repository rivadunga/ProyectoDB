-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema DBProyecto
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema DBProyecto
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `DBProyecto` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `DBProyecto` ;

-- -----------------------------------------------------
-- Table `DBProyecto`.`Place`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DBProyecto`.`Place` (
  `id_place` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `name` VARCHAR(100) NOT NULL COMMENT '',
  `latitude` FLOAT NOT NULL COMMENT '',
  `longitude` FLOAT NOT NULL COMMENT '',
  `radio` FLOAT NOT NULL COMMENT '',
  PRIMARY KEY (`id_place`)  COMMENT '')
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DBProyecto`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DBProyecto`.`User` (
  `id_user` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `name` TEXT NOT NULL COMMENT '',
  `mail` TEXT NOT NULL COMMENT '',
  `password` TEXT NOT NULL COMMENT '',
  PRIMARY KEY (`id_user`)  COMMENT '')
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DBProyecto`.`Post`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DBProyecto`.`Post` (
  `id_post` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `date` DATETIME NOT NULL COMMENT '',
  `content` TEXT NOT NULL COMMENT '',
  `id_user` INT NOT NULL COMMENT '',
  `id_place` INT NOT NULL COMMENT '',
  PRIMARY KEY (`id_post`)  COMMENT '',
  INDEX `fk_post_place_idx` (`id_place` ASC)  COMMENT '',
  INDEX `fk_post_user_idx` (`id_user` ASC)  COMMENT '',
  CONSTRAINT `fk_post_place`
    FOREIGN KEY (`id_place`)
    REFERENCES `DBProyecto`.`Place` (`id_place`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_post_user`
    FOREIGN KEY (`id_user`)
    REFERENCES `DBProyecto`.`User` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DBProyecto`.`Like`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DBProyecto`.`Like` (
  `id_like` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `id_post` INT NOT NULL COMMENT '',
  `id_user` INT NOT NULL COMMENT '',
  PRIMARY KEY (`id_like`)  COMMENT '',
  INDEX `fk_like_post_idx` (`id_post` ASC)  COMMENT '',
  INDEX `fk_like_user_idx` (`id_user` ASC)  COMMENT '',
  CONSTRAINT `fk_like_post`
    FOREIGN KEY (`id_post`)
    REFERENCES `DBProyecto`.`Post` (`id_post`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_like_user`
    FOREIGN KEY (`id_user`)
    REFERENCES `DBProyecto`.`User` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DBProyecto`.`Friends`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DBProyecto`.`Friends` (
  `id_friends` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `id_user_a` INT NOT NULL COMMENT '',
  `id_user_b` INT NOT NULL COMMENT '',
  PRIMARY KEY (`id_friends`)  COMMENT '',
  INDEX `fk_friends_user_a_idx` (`id_user_a` ASC)  COMMENT '',
  INDEX `fk_friends_user_b_idx` (`id_user_b` ASC)  COMMENT '',
  CONSTRAINT `fk_friends_user_a`
    FOREIGN KEY (`id_user_a`)
    REFERENCES `DBProyecto`.`User` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_friends_user_b`
    FOREIGN KEY (`id_user_b`)
    REFERENCES `DBProyecto`.`User` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DBProyecto`.`File`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DBProyecto`.`File` (
  `id_file` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `name` TEXT NOT NULL COMMENT '',
  `format` TEXT NOT NULL COMMENT '',
  `url` TEXT NOT NULL COMMENT '',
  PRIMARY KEY (`id_file`)  COMMENT '')
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DBProyecto`.`PostFile`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DBProyecto`.`PostFile` (
  `id_postFile` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `id_post` INT NOT NULL COMMENT '',
  `id_file` INT NOT NULL COMMENT '',
  PRIMARY KEY (`id_postFile`)  COMMENT '',
  INDEX `fk_postFile_post_idx` (`id_post` ASC)  COMMENT '',
  INDEX `fk_postFile_file_idx` (`id_file` ASC)  COMMENT '',
  CONSTRAINT `fk_postFile_post`
    FOREIGN KEY (`id_post`)
    REFERENCES `DBProyecto`.`Post` (`id_post`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_postFile_file`
    FOREIGN KEY (`id_file`)
    REFERENCES `DBProyecto`.`File` (`id_file`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
