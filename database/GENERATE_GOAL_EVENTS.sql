--------------------------------------------------------
--  DDL for Procedure GENERATE_GOAL_EVENTS
--------------------------------------------------------
set define off;

  CREATE OR REPLACE NONEDITIONABLE PROCEDURE "SYSTEM"."GENERATE_GOAL_EVENTS" AS
BEGIN
    -- Clear existing goal events
    DELETE FROM Event WHERE event_event_type = 'GOAL';

    -- Insert new goal events with randomized timestamps
    FOR goal_rec IN (
        SELECT ps.player_id, ps.match_id, ps.stat_goals 
        FROM Player_Stats ps 
        WHERE ps.stat_goals > 0
    ) LOOP
        FOR i IN 1..goal_rec.stat_goals LOOP
            INSERT INTO Event (
                event_id, 
                player_id, 
                match_id, 
                event_event_type, 
                event_minute, 
                event_is_own_goal
            )
            VALUES (
                event_seq.NEXTVAL,
                goal_rec.player_id,
                goal_rec.match_id,
                'GOAL',
                ROUND(DBMS_RANDOM.VALUE(1, 90)),
                0
            );
        END LOOP;
    END LOOP;

    COMMIT;
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        RAISE;
END;

/
