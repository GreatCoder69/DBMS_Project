--------------------------------------------------------
--  DDL for Trigger MATCH_ID_TRIGGER
--------------------------------------------------------

  CREATE OR REPLACE NONEDITIONABLE TRIGGER "SYSTEM"."MATCH_ID_TRIGGER" 
BEFORE INSERT ON Match
FOR EACH ROW
BEGIN
    IF :NEW.match_id IS NULL THEN
        :NEW.match_id := match_seq.NEXTVAL;
    END IF;
END;

/
ALTER TRIGGER "SYSTEM"."MATCH_ID_TRIGGER" ENABLE;
