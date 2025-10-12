CREATE TABLE `users`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `firstname` TEXT NOT NULL,
    `lastname` TEXT NOT NULL,
    `email` TEXT NOT NULL,
    `phone` CHAR(25) NOT NULL,
    `age` INT NOT NULL,
    `gender` TEXT NOT NULL,
    `job` TEXT NOT NULL,
    `city` TEXT NOT NULL,
    `zipcode` CHAR(25) NOT NULL,
    `description` BIGINT NOT NULL,
    `chosen_activity` TEXT NOT NULL,
    `created_at` TIMESTAMP NOT NULL
);
CREATE TABLE `senior`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `firstname` TEXT NOT NULL,
    `lastname` TEXT NOT NULL,
    `email` TEXT NOT NULL,
    `phone` CHAR(25) NOT NULL,
    `age` INT NOT NULL,
    `gender` TEXT NOT NULL,
    `job` TEXT NOT NULL,
    `city` TEXT NOT NULL,
    `zip` CHAR(25) NOT NULL,
    `description` TEXT NOT NULL,
    `chosen_activity` TEXT NOT NULL,
    `created_at` BIGINT NOT NULL
);
CREATE TABLE `activity`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `type` TEXT NOT NULL
);
CREATE TABLE `moment`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `senior_id` INT NOT NULL,
    `chosen_activity` INT NOT NULL,
    `meeting_day` DATE NOT NULL,
    `meeting_time` DATETIME NOT NULL,
    `meeting_address` TEXT NOT NULL,
    `meeting_address_city` TEXT NOT NULL,
    `meeting_adress_zipcode` CHAR(25) NOT NULL
);
CREATE TABLE `city`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `city` BIGINT NOT NULL
);
ALTER TABLE
    `senior` ADD CONSTRAINT `senior_chosen_activity_foreign` FOREIGN KEY(`chosen_activity`) REFERENCES `city`(`city`);
ALTER TABLE
    `moment` ADD CONSTRAINT `moment_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `users`(`id`);
ALTER TABLE
    `moment` ADD CONSTRAINT `moment_senior_id_foreign` FOREIGN KEY(`senior_id`) REFERENCES `senior`(`id`);
ALTER TABLE
    `users` ADD CONSTRAINT `users_chosen_activity_foreign` FOREIGN KEY(`chosen_activity`) REFERENCES `city`(`city`);
ALTER TABLE
    `users` ADD CONSTRAINT `users_chosen_activity_foreign` FOREIGN KEY(`chosen_activity`) REFERENCES `activity`(`type`);
ALTER TABLE
    `senior` ADD CONSTRAINT `senior_chosen_activity_foreign` FOREIGN KEY(`chosen_activity`) REFERENCES `activity`(`type`);