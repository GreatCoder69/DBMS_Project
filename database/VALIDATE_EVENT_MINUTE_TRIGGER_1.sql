--------------------------------------------------------
--  DDL for Trigger VALIDATE_EVENT_MINUTE_TRIGGER
--------------------------------------------------------

  CREATE OR REPLACE NONEDITIONABLE TRIGGER "SYSTEM"."VALIDATE_EVENT_MINUTE_TRIGGER" 
BEFORE INSERT OR UPDATE ON Event
FOR EACH ROW
BEGIN
    IF :NEW.event_minute < 0 OR :NEW.event_minute > 120 THEN
        RAISE_APPLICATION_ERROR(-20002, 'Event minute must be between 0 and 120');
    END IF;
END;

/
ALTER TRIGGER "SYSTEM"."VALIDATE_EVENT_MINUTE_TRIGGER" ENABLE;
