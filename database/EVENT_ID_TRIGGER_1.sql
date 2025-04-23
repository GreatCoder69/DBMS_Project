--------------------------------------------------------
--  DDL for Trigger EVENT_ID_TRIGGER
--------------------------------------------------------

  CREATE OR REPLACE NONEDITIONABLE TRIGGER "SYSTEM"."EVENT_ID_TRIGGER" 
BEFORE INSERT ON Event
FOR EACH ROW
BEGIN
    IF :NEW.event_id IS NULL THEN
        :NEW.event_id := event_seq.NEXTVAL;
    END IF;
END;

/
ALTER TRIGGER "SYSTEM"."EVENT_ID_TRIGGER" ENABLE;
