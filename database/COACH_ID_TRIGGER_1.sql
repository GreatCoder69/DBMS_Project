--------------------------------------------------------
--  DDL for Trigger COACH_ID_TRIGGER
--------------------------------------------------------

  CREATE OR REPLACE NONEDITIONABLE TRIGGER "SYSTEM"."COACH_ID_TRIGGER" 
BEFORE INSERT ON Coach
FOR EACH ROW
BEGIN
    IF :NEW.coach_id IS NULL THEN
        :NEW.coach_id := coach_seq.NEXTVAL;
    END IF;
END;

/
ALTER TRIGGER "SYSTEM"."COACH_ID_TRIGGER" ENABLE;
