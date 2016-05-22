package com.kimreik.game;

import static com.mysema.query.types.PathMetadataFactory.*;

import com.mysema.query.types.path.*;

import com.mysema.query.types.PathMetadata;
import javax.annotation.Generated;
import com.mysema.query.types.Path;
import com.mysema.query.types.path.PathInits;


/**
 * QGame is a Querydsl query type for Game
 */
@Generated("com.mysema.query.codegen.EmbeddableSerializer")
public class QGame extends BeanPath<Game> {

    private static final long serialVersionUID = -531252777L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QGame game = new QGame("game");

    public final SetPath<Point, QPoint> explodedBombs = this.<Point, QPoint>createSet("explodedBombs", Point.class, QPoint.class, PathInits.DIRECT2);

    public final SetPath<Point, QPoint> flags = this.<Point, QPoint>createSet("flags", Point.class, QPoint.class, PathInits.DIRECT2);

    public final QMineField mineField;

    public final SetPath<Point, QPoint> openedField = this.<Point, QPoint>createSet("openedField", Point.class, QPoint.class, PathInits.DIRECT2);

    public QGame(String variable) {
        this(Game.class, forVariable(variable), INITS);
    }

    public QGame(Path<? extends Game> path) {
        this(path.getType(), path.getMetadata(), path.getMetadata().isRoot() ? INITS : PathInits.DEFAULT);
    }

    public QGame(PathMetadata<?> metadata) {
        this(metadata, metadata.isRoot() ? INITS : PathInits.DEFAULT);
    }

    public QGame(PathMetadata<?> metadata, PathInits inits) {
        this(Game.class, metadata, inits);
    }

    public QGame(Class<? extends Game> type, PathMetadata<?> metadata, PathInits inits) {
        super(type, metadata, inits);
        this.mineField = inits.isInitialized("mineField") ? new QMineField(forProperty("mineField")) : null;
    }

}

