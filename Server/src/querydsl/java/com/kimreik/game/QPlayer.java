package com.kimreik.game;

import static com.mysema.query.types.PathMetadataFactory.*;

import com.mysema.query.types.path.*;

import com.mysema.query.types.PathMetadata;
import javax.annotation.Generated;
import com.mysema.query.types.Path;


/**
 * QPlayer is a Querydsl query type for Player
 */
@Generated("com.mysema.query.codegen.EmbeddableSerializer")
public class QPlayer extends BeanPath<Player> {

    private static final long serialVersionUID = 834675590L;

    public static final QPlayer player = new QPlayer("player");

    public final BooleanPath bombed = createBoolean("bombed");

    public final NumberPath<Integer> currentScore = createNumber("currentScore", Integer.class);

    public final BooleanPath isBombed = createBoolean("isBombed");

    public final BooleanPath isLeaved = createBoolean("isLeaved");

    public final BooleanPath leader = createBoolean("leader");

    public final BooleanPath leaved = createBoolean("leaved");

    public final NumberPath<Integer> rating = createNumber("rating", Integer.class);

    public final StringPath username = createString("username");

    public QPlayer(String variable) {
        super(Player.class, forVariable(variable));
    }

    public QPlayer(Path<? extends Player> path) {
        super(path.getType(), path.getMetadata());
    }

    public QPlayer(PathMetadata<?> metadata) {
        super(Player.class, metadata);
    }

}

