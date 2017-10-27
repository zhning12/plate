Model = {
    """
    CREATE TABLE IF NOT EXISTS USER (
         ID INT NOT NULL AUTO_INCREMENT,
         NAME VARCHAR(20),
         AGE INT,
         PRIMARY KEY (ID) )
    """,
    """
    CREATE TABLE IF NOT EXISTS INFO (
         ID INT NOT NULL AUTO_INCREMENT,
         INFO VARCHAR(20),
         OTHER INT,
         PRIMARY KEY (ID) )
    """
}