package com.kimreik.game;

import com.mysema.query.types.Path;
import com.mysema.query.types.PathMetadata;
import com.mysema.query.types.path.BeanPath;
import com.mysema.query.types.path.BooleanPath;
import com.mysema.query.types.path.NumberPath;
import com.mysema.query.types.path.StringPath;

import javax.annotation.Generated;

import static com.mysema.query.types.PathMetadataFactory.forVariable;

/**
 * QPlayer is a Querydsl query type for Player
 */
@Generated("com.mysema.query.codegen.EmbeddableSerializer")
public class QPlayer extends BeanPath<Player>
{

	public static final QPlayer			player				= new QPlayer("player");
	private static final long			serialVersionUID	= 834675590L;
	public final NumberPath<Integer>	currentScore		= createNumber("currentScore", Integer.class);

	public final BooleanPath			isBombed			= createBoolean("isBombed");

	public final BooleanPath			isLeaved			= createBoolean("isLeaved");

	public final StringPath				username			= createString("username");

	public QPlayer(String variable)
	{
		super(Player.class, forVariable(variable));
	}

	public QPlayer(Path<? extends Player> path)
	{
		super(path.getType(), path.getMetadata());
	}

	public QPlayer(PathMetadata<?> metadata)
	{
		super(Player.class, metadata);
	}

}
