package com.kimreik.statistics;

import static com.mysema.query.types.PathMetadataFactory.*;

import com.mysema.query.types.path.*;

import com.mysema.query.types.PathMetadata;
import javax.annotation.Generated;
import com.mysema.query.types.Path;
import com.mysema.query.types.path.PathInits;


/**
 * QEndedGame is a Querydsl query type for EndedGame
 */
@Generated("com.mysema.query.codegen.EntitySerializer")
public class QEndedGame extends EntityPathBase<EndedGame> {

    private static final long serialVersionUID = -1493199432L;

    public static final QEndedGame endedGame = new QEndedGame("endedGame");

    public final NumberPath<Long> date = createNumber("date", Long.class);

    public final NumberPath<Integer> height = createNumber("height", Integer.class);

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final BooleanPath isWin = createBoolean("isWin");

    public final NumberPath<Integer> minesCount = createNumber("minesCount", Integer.class);

    public final StringPath name = createString("name");

    public final ListPath<com.kimreik.game.Player, com.kimreik.game.QPlayer> players = this.<com.kimreik.game.Player, com.kimreik.game.QPlayer>createList("players", com.kimreik.game.Player.class, com.kimreik.game.QPlayer.class, PathInits.DIRECT2);

    public final NumberPath<Integer> score = createNumber("score", Integer.class);

    public final NumberPath<Integer> width = createNumber("width", Integer.class);

    public QEndedGame(String variable) {
        super(EndedGame.class, forVariable(variable));
    }

    public QEndedGame(Path<? extends EndedGame> path) {
        super(path.getType(), path.getMetadata());
    }

    public QEndedGame(PathMetadata<?> metadata) {
        super(EndedGame.class, metadata);
    }

}

