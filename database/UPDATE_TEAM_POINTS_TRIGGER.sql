--------------------------------------------------------
--  DDL for Trigger UPDATE_TEAM_POINTS_TRIGGER
--------------------------------------------------------

  CREATE OR REPLACE NONEDITIONABLE TRIGGER "SYSTEM"."UPDATE_TEAM_POINTS_TRIGGER" 
AFTER INSERT OR UPDATE ON Match
FOR EACH ROW
DECLARE
    v_old_home_points NUMBER := 0;
    v_old_away_points NUMBER := 0;
    v_new_home_points NUMBER := 0;
    v_new_away_points NUMBER := 0;
BEGIN
    -- Calculate points from old scores (for updates)
    IF UPDATING THEN
        CASE
            WHEN :OLD.match_home_score > :OLD.match_away_score THEN
                v_old_home_points := 3;
            WHEN :OLD.match_home_score < :OLD.match_away_score THEN
                v_old_away_points := 3;
            ELSE
                v_old_home_points := 1;
                v_old_away_points := 1;
        END CASE;
    END IF;

    -- Calculate points from new scores
    CASE
        WHEN :NEW.match_home_score > :NEW.match_away_score THEN
            v_new_home_points := 3;
        WHEN :NEW.match_home_score < :NEW.match_away_score THEN
            v_new_away_points := 3;
        ELSE
            v_new_home_points := 1;
            v_new_away_points := 1;
    END CASE;

    -- Update team points (handles both INSERT and UPDATE scenarios)
    UPDATE Team
    SET team_points = team_points 
        - v_old_home_points 
        + v_new_home_points
    WHERE team_id = :NEW.team_home_id;

    UPDATE Team
    SET team_points = team_points 
        - v_old_away_points 
        + v_new_away_points
    WHERE team_id = :NEW.team_away_id;
END;

/
ALTER TRIGGER "SYSTEM"."UPDATE_TEAM_POINTS_TRIGGER" ENABLE;
