--------------------------------------------------------
--  DDL for Trigger STADIUM_ID_TRIGGER
--------------------------------------------------------

  CREATE OR REPLACE NONEDITIONABLE TRIGGER "SYSTEM"."STADIUM_ID_TRIGGER" 
BEFORE INSERT ON Stadium
FOR EACH ROW
BEGIN
    IF :NEW.stadium_id IS NULL THEN
        :NEW.stadium_id := stadium_seq.NEXTVAL;
    END IF;
END;

/
ALTER TRIGGER "SYSTEM"."STADIUM_ID_TRIGGER" ENABLE;
