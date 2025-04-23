--------------------------------------------------------
--  DDL for Trigger GOAL_EVENT_TRIGGER
--------------------------------------------------------

  CREATE OR REPLACE NONEDITIONABLE TRIGGER "SYSTEM"."GOAL_EVENT_TRIGGER" 
AFTER INSERT ON Event
FOR EACH ROW
BEGIN
    IF :NEW.event_event_type = 'GOAL' THEN
        IF :NEW.event_is_own_goal = 0 THEN
            -- Regular goal - update player's goal count
            UPDATE Player_Stats
            SET stat_goals = stat_goals + 1
            WHERE player_id = :NEW.player_id AND match_id = :NEW.match_id;
        END IF;
    END IF;
END;

/
ALTER TRIGGER "SYSTEM"."GOAL_EVENT_TRIGGER" ENABLE;
