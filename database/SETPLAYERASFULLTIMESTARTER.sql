--------------------------------------------------------
--  DDL for Procedure SETPLAYERASFULLTIMESTARTER
--------------------------------------------------------
set define off;

  CREATE OR REPLACE NONEDITIONABLE PROCEDURE "SYSTEM"."SETPLAYERASFULLTIMESTARTER" (
    p_team_id IN NUMBER,
    p_jersey_number IN NUMBER
)
IS
    v_player_id Player.player_id%TYPE;
    v_player_position Player.player_position%TYPE;
    v_match_count NUMBER;
    
    CURSOR c_matches IS
        SELECT match_id 
        FROM Match
        WHERE team_home_id = p_team_id OR team_away_id = p_team_id;
    
BEGIN
    -- Get player's ID and position from jersey number
    SELECT player_id, player_position 
    INTO v_player_id, v_player_position
    FROM Player
    WHERE team_id = p_team_id
      AND player_jersey_number = p_jersey_number;
    
    -- Verify team has played matches
    SELECT COUNT(*) INTO v_match_count
    FROM Match
    WHERE team_home_id = p_team_id OR team_away_id = p_team_id;
    
    IF v_match_count = 0 THEN
        RAISE_APPLICATION_ERROR(-20001, 'Team has not played any matches');
    END IF;
    
    -- Process all matches
    FOR match_rec IN c_matches LOOP
        MERGE INTO Player_Stats ps
        USING (SELECT match_rec.match_id AS match_id, v_player_id AS player_id FROM dual) src
        ON (ps.match_id = src.match_id AND ps.player_id = src.player_id)
        WHEN MATCHED THEN
            UPDATE SET
                lineup_is_starter = 1,
                lineup_position_played = v_player_position,
                stat_minutes_played = 90,
                stat_goals = 0,
                stat_assists = 0,
                stat_shots = 0,
                stat_shots_on_target = 0
        WHEN NOT MATCHED THEN
            INSERT (match_id, player_id, lineup_is_starter, lineup_position_played,
                    stat_minutes_played, stat_goals, stat_assists, stat_shots, stat_shots_on_target)
            VALUES (src.match_id, src.player_id, 1, v_player_position, 90, 0, 0, 0, 0);
    END LOOP;
    
    COMMIT;
    
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RAISE_APPLICATION_ERROR(-20002, 'Player not found with given jersey number in specified team');
    WHEN OTHERS THEN
        ROLLBACK;
        RAISE;
END;

/
