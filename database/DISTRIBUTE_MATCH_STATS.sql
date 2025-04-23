--------------------------------------------------------
--  DDL for Procedure DISTRIBUTE_MATCH_STATS
--------------------------------------------------------
set define off;

  CREATE OR REPLACE NONEDITIONABLE PROCEDURE "SYSTEM"."DISTRIBUTE_MATCH_STATS" AS
    v_player_id NUMBER;
    v_rand NUMBER;
    v_goal_position VARCHAR2(20);
BEGIN
    UPDATE Player_Stats SET stat_goals = 0, stat_assists = 0;
    commit;

    FOR match_rec IN (
        SELECT match_id, team_home_id, team_away_id, match_home_score, match_away_score FROM Match
    ) LOOP
        -- Home team goals
        FOR i IN 1..match_rec.match_home_score LOOP
            v_rand := DBMS_RANDOM.VALUE(0, 1);

            IF v_rand < 0.65 THEN
                v_goal_position := 'Forward';
            ELSIF v_rand < 0.90 THEN
                v_goal_position := 'Midfielder';
            ELSE
                v_goal_position := 'Defender';
            END IF;

            -- Pick a random starter of the chosen position
            BEGIN
                SELECT ps.player_id INTO v_player_id
                FROM Player_Stats ps
                JOIN Player p ON ps.player_id = p.player_id
                WHERE ps.match_id = match_rec.match_id
                  AND p.team_id = match_rec.team_home_id
                  AND ps.lineup_is_starter = 1
                  AND p.player_position = v_goal_position
                ORDER BY DBMS_RANDOM.VALUE
                FETCH FIRST 1 ROWS ONLY;

                UPDATE Player_Stats
                SET stat_goals = stat_goals + 1
                WHERE match_id = match_rec.match_id
                  AND player_id = v_player_id;
            EXCEPTION
                WHEN NO_DATA_FOUND THEN
                    -- If no player of that position, pick any starter
                    SELECT ps.player_id INTO v_player_id
                    FROM Player_Stats ps
                    JOIN Player p ON ps.player_id = p.player_id
                    WHERE ps.match_id = match_rec.match_id
                      AND p.team_id = match_rec.team_home_id
                      AND ps.lineup_is_starter = 1
                    ORDER BY DBMS_RANDOM.VALUE
                    FETCH FIRST 1 ROWS ONLY;

                    UPDATE Player_Stats
                    SET stat_goals = stat_goals + 1
                    WHERE match_id = match_rec.match_id
                      AND player_id = v_player_id;
            END;

            -- Assists (same as before)
            SELECT ps.player_id INTO v_player_id
            FROM Player_Stats ps
            JOIN Player p ON ps.player_id = p.player_id
            WHERE ps.match_id = match_rec.match_id
              AND p.team_id = match_rec.team_home_id
              AND ps.lineup_is_starter = 1
            ORDER BY 
                CASE 
                    WHEN p.player_position = 'Midfielder' THEN DBMS_RANDOM.VALUE(0, 0.3)
                    WHEN p.player_position = 'Forward' THEN DBMS_RANDOM.VALUE(0.3, 0.7)
                    ELSE DBMS_RANDOM.VALUE(0.7, 1)
                END
            FETCH FIRST 1 ROWS ONLY;

            UPDATE Player_Stats
            SET stat_assists = stat_assists + 1
            WHERE match_id = match_rec.match_id
              AND player_id = v_player_id;
        END LOOP;

        -- Away team goals (repeat logic)
        FOR i IN 1..match_rec.match_away_score LOOP
            v_rand := DBMS_RANDOM.VALUE(0, 1);

            IF v_rand < 0.65 THEN
                v_goal_position := 'Forward';
            ELSIF v_rand < 0.90 THEN
                v_goal_position := 'Midfielder';
            ELSE
                v_goal_position := 'Defender';
            END IF;

            BEGIN
                SELECT ps.player_id INTO v_player_id
                FROM Player_Stats ps
                JOIN Player p ON ps.player_id = p.player_id
                WHERE ps.match_id = match_rec.match_id
                  AND p.team_id = match_rec.team_away_id
                  AND ps.lineup_is_starter = 1
                  AND p.player_position = v_goal_position
                ORDER BY DBMS_RANDOM.VALUE
                FETCH FIRST 1 ROWS ONLY;

                UPDATE Player_Stats
                SET stat_goals = stat_goals + 1
                WHERE match_id = match_rec.match_id
                  AND player_id = v_player_id;
            EXCEPTION
                WHEN NO_DATA_FOUND THEN
                    SELECT ps.player_id INTO v_player_id
                    FROM Player_Stats ps
                    JOIN Player p ON ps.player_id = p.player_id
                    WHERE ps.match_id = match_rec.match_id
                      AND p.team_id = match_rec.team_away_id
                      AND ps.lineup_is_starter = 1
                    ORDER BY DBMS_RANDOM.VALUE
                    FETCH FIRST 1 ROWS ONLY;

                    UPDATE Player_Stats
                    SET stat_goals = stat_goals + 1
                    WHERE match_id = match_rec.match_id
                      AND player_id = v_player_id;
            END;

            -- Assists (same as before)
            SELECT ps.player_id INTO v_player_id
            FROM Player_Stats ps
            JOIN Player p ON ps.player_id = p.player_id
            WHERE ps.match_id = match_rec.match_id
              AND p.team_id = match_rec.team_away_id
              AND ps.lineup_is_starter = 1
            ORDER BY 
                CASE 
                    WHEN p.player_position = 'Midfielder' THEN DBMS_RANDOM.VALUE(0, 0.3)
                    WHEN p.player_position = 'Forward' THEN DBMS_RANDOM.VALUE(0.3, 0.7)
                    ELSE DBMS_RANDOM.VALUE(0.7, 1)
                END
            FETCH FIRST 1 ROWS ONLY;

            UPDATE Player_Stats
            SET stat_assists = stat_assists + 1
            WHERE match_id = match_rec.match_id
              AND player_id = v_player_id;
        END LOOP;
    END LOOP;

    COMMIT;
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        RAISE;
END;

/
