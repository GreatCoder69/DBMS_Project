--------------------------------------------------------
--  DDL for Trigger PLAYER_ID_TRIGGER
--------------------------------------------------------

  CREATE OR REPLACE NONEDITIONABLE TRIGGER "SYSTEM"."PLAYER_ID_TRIGGER" 
BEFORE INSERT ON Player
FOR EACH ROW
BEGIN
    IF :NEW.player_id IS NULL THEN
        :NEW.player_id := player_seq.NEXTVAL;
    END IF;
END;

/
ALTER TRIGGER "SYSTEM"."PLAYER_ID_TRIGGER" ENABLE;
