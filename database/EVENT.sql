--------------------------------------------------------
--  DDL for Table EVENT
--------------------------------------------------------

  CREATE TABLE "SYSTEM"."EVENT" 
   (	"PLAYER_ID" NUMBER, 
	"MATCH_ID" NUMBER, 
	"EVENT_ID" NUMBER, 
	"EVENT_EVENT_TYPE" VARCHAR2(50), 
	"EVENT_MINUTE" NUMBER, 
	"EVENT_IS_OWN_GOAL" NUMBER(1,0) DEFAULT 0
   ) ;
