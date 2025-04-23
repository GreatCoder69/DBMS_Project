--------------------------------------------------------
--  DDL for Trigger TEAM_ID_TRIGGER
--------------------------------------------------------

  CREATE OR REPLACE NONEDITIONABLE TRIGGER "SYSTEM"."TEAM_ID_TRIGGER" 
BEFORE INSERT ON Team
FOR EACH ROW
BEGIN
    IF :NEW.team_id IS NULL THEN
        :NEW.team_id := team_seq.NEXTVAL;
    END IF;
END;

/
ALTER TRIGGER "SYSTEM"."TEAM_ID_TRIGGER" ENABLE;
